import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";
import { S3Client, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { logger } from "@/utils/logger";

function resolveStorageDir(): string {
  if (process.env.STORAGE_DIR) return process.env.STORAGE_DIR;
  const projectStoragePath = "/home/travel2d/dubai-travels/storage-service/storage/images";
  if (fs.existsSync(projectStoragePath)) return projectStoragePath;
  const localPath = path.join(process.cwd(), "storage/images");
  fs.mkdirSync(localPath, { recursive: true });
  return localPath;
}

const STORAGE_DIR = resolveStorageDir();

function getStoragePublicBase(): string {
  return process.env.STORAGE_PUBLIC_URL || "https://upload.travel2dubai.co.in";
}

// ─── Cloudflare R2 S3 Client (for fallback to previous images) ────────────────
function getR2Client(): S3Client | null {
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const endpoint =
    process.env.R2_ENDPOINT_URL ||
    (process.env.R2_ACCOUNT_ID ? `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com` : undefined);

  if (!accessKeyId || !secretAccessKey || !endpoint) return null;

  return new S3Client({
    region: "auto",
    endpoint,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

function getR2BucketName(): string {
  return process.env.R2_BUCKET_NAME || "trip-tour";
}

// ─── Generate a presigned PUT URL (browser uploads directly to storage service)
export async function generatePresignedUploadUrl(
  contentType: string,
  folder = "packages",
): Promise<{ uploadUrl: string; key: string; publicUrl: string }> {
  const ext = contentType.split("/")[1]?.replace("jpeg", "jpg") ?? "jpg";
  const filename = `${uuid()}.${ext}`;
  const key = `${folder}/${filename}`;

  // Ensure subfolder exists safely
  try {
    const folderPath = path.join(STORAGE_DIR, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
  } catch (err) {
    logger.warn(`Could not create storage folder ${folder}:`, err);
  }

  const base = getStoragePublicBase();
  const uploadUrl = `${base}/upload/${key}`;
  const publicUrl = `${base}/${key}`;

  return { uploadUrl, key, publicUrl };
}

// ─── Upload a file to local storage from the server ────────────────────────
export async function uploadToR2(
  buffer: Buffer,
  contentType: string,
  folder = "packages",
): Promise<{ key: string; publicUrl: string }> {
  const ext = contentType.split("/")[1]?.replace("jpeg", "jpg") ?? "jpg";
  const filename = `${uuid()}.${ext}`;
  const key = `${folder}/${filename}`;

  try {
    const folderPath = path.join(STORAGE_DIR, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
  } catch (err) {
    logger.warn(`Could not create storage folder ${folder}:`, err);
  }

  const filePath = path.join(STORAGE_DIR, key);
  await fs.promises.writeFile(filePath, buffer);

  const publicUrl = `${getStoragePublicBase()}/${key}`;
  return { key, publicUrl };
}

// ─── Delete an object from storage or Cloudflare R2 ─────────────────────────
export async function deleteFromR2(key: string): Promise<boolean> {
  if (!key) return false;
  let deleted = false;
  try {
    const filePath = path.join(STORAGE_DIR, key);
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
      deleted = true;
    }
  } catch (err) {
    logger.error("Storage delete error:", err);
  }

  const r2Client = getR2Client();
  if (r2Client) {
    try {
      await r2Client.send(new DeleteObjectCommand({ Bucket: getR2BucketName(), Key: key }));
      deleted = true;
    } catch (err) {
      logger.warn(`Could not delete key ${key} from R2 bucket:`, err);
    }
  }

  return deleted;
}

// ─── Get an object stream from local disk or Cloudflare R2 ────────────────
export async function getObjectFromR2(key: string) {
  // 1. Check local/VPS disk storage first
  const filePath = path.join(STORAGE_DIR, key);
  if (fs.existsSync(filePath)) {
    const stream = fs.createReadStream(filePath);
    const stat = await fs.promises.stat(filePath);
    const ext = path.extname(key).replace(".", "").toLowerCase();
    const mimeTypes: Record<string, string> = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      webp: "image/webp",
      gif: "image/gif",
      pdf: "application/pdf"
    };

    return {
      Body: stream,
      ContentType: mimeTypes[ext] || "application/octet-stream",
      ContentLength: stat.size
    };
  }

  // 2. Fallback to Cloudflare R2 bucket for previous images
  const r2Client = getR2Client();
  if (r2Client) {
    try {
      const command = new GetObjectCommand({
        Bucket: getR2BucketName(),
        Key: key,
      });
      const response = await r2Client.send(command);
      if (response.Body) {
        return {
          Body: response.Body,
          ContentType: response.ContentType || "image/jpeg",
          ContentLength: response.ContentLength
        };
      }
    } catch (err: any) {
      logger.warn(`Key "${key}" not found in Cloudflare R2 bucket: ${err?.message}`);
    }
  }

  throw new Error(`File not found: ${key}`);
}

// ─── Generate GET URL ──────────────────────────────────────────────────────
export async function generatePresignedGetUrl(key: string): Promise<string> {
  return `${getStoragePublicBase()}/${key}`;
}
