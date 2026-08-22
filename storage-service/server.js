require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 4000;

// Fallback to local ./storage/images if /var/storage/images cannot be accessed
function resolveStoragePath() {
  if (process.env.STORAGE) return process.env.STORAGE;
  const localPath = path.join(__dirname, "storage/images");
  fs.mkdirSync(localPath, { recursive: true });
  return localPath;
}

const STORAGE = resolveStoragePath();
const PUBLIC_URL = process.env.PUBLIC_URL || "https://upload.travel2dubai.co.in";

// Enable CORS for direct browser uploads and cross-origin access
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Range"],
    credentials: false
  })
);

// Multer storage setup for multipart uploads
const storageEngine = multer.diskStorage({
  destination: (req, _file, cb) => {
    const folder = req.body.folder || "packages";
    const destPath = path.join(STORAGE, folder);
    fs.mkdirSync(destPath, { recursive: true });
    cb(null, destPath);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || "";
    const uniqueFilename = `${crypto.randomUUID()}${ext}`;
    cb(null, uniqueFilename);
  }
});

const upload = multer({
  storage: storageEngine,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Health check endpoint
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "dubai-storage-service",
    storage: STORAGE,
    uptime: process.uptime()
  });
});

// 1. POST /upload - Multipart Form Upload (single file)
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      error: "File is required under field name 'file'"
    });
  }

  const folder = req.body.folder || "packages";
  const key = `${folder}/${req.file.filename}`;
  const url = `${PUBLIC_URL}/${key}`;

  res.status(200).json({
    success: true,
    key,
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype,
    url
  });
});

// 2. POST /upload/batch - Multipart Form Upload (multiple files)
app.post("/upload/batch", upload.array("files", 20), (req, res) => {
  const files = req.files;
  if (!files || files.length === 0) {
    return res.status(400).json({
      error: "Files array required under field name 'files'"
    });
  }

  const folder = req.body.folder || "packages";
  const results = files.map((file) => {
    const key = `${folder}/${file.filename}`;
    return {
      key,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      url: `${PUBLIC_URL}/${key}`
    };
  });

  res.status(200).json({
    success: true,
    results
  });
});

// Helper function for wildcard direct PUT stream uploads
app.put("/upload/*", express.raw({ type: "*/*", limit: "50mb" }), (req, res) => {
  const key = req.params[0];
  handleDirectPut(key, req, res);
});

app.put("/*", express.raw({ type: "*/*", limit: "50mb" }), (req, res, next) => {
  const key = req.params[0];
  if (key === "health" || key.startsWith("upload")) return next();
  handleDirectPut(key, req, res);
});

function handleDirectPut(key, req, res) {
  if (!key) {
    return res.status(400).json({ error: "File key is required" });
  }

  const normalizedKey = path.normalize(key).replace(/^(\.\.[\/\\])+/, "");
  const filePath = path.join(STORAGE, normalizedKey);

  // Ensure parent subdirectory exists
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  const writeStream = fs.createWriteStream(filePath);

  if (Buffer.isBuffer(req.body) && req.body.length > 0) {
    writeStream.write(req.body);
    writeStream.end();
  } else {
    req.pipe(writeStream);
  }

  writeStream.on("finish", () => {
    const url = `${PUBLIC_URL}/${normalizedKey}`;
    res.status(200).json({
      success: true,
      key: normalizedKey,
      filename: path.basename(normalizedKey),
      url
    });
  });

  writeStream.on("error", (err) => {
    res.status(500).json({ error: "Failed to write file stream", details: err.message });
  });
}

// 4. DELETE /* & DELETE /upload/* - Delete File
app.delete("/upload/*", (req, res) => {
  const key = req.params[0];
  handleDelete(key, req, res);
});

app.delete("/*", (req, res, next) => {
  const key = req.params[0];
  if (key === "health" || key.startsWith("upload")) return next();
  handleDelete(key, req, res);
});

function handleDelete(key, req, res) {
  if (!key) return res.status(400).json({ error: "File key is required" });
  const normalizedKey = path.normalize(key).replace(/^(\.\.[\/\\])+/, "");
  const file = path.join(STORAGE, normalizedKey);

  if (!fs.existsSync(file)) {
    return res.status(404).json({ error: "File not found" });
  }

  try {
    fs.unlinkSync(file);
    res.status(200).json({
      success: true,
      message: `File ${normalizedKey} deleted successfully`
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to delete file",
      details: err.message
    });
  }
}

// 5. GET /* - Serve Static Files with Cache-Control
app.use(express.static(STORAGE, { maxAge: "365d" }));

app.get("/*", (req, res, next) => {
  const key = req.params[0];
  if (key === "health") return next();

  const normalizedKey = path.normalize(key).replace(/^(\.\.[\/\\])+/, "");
  const filePath = path.join(STORAGE, normalizedKey);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    return res.sendFile(filePath);
  }

  next();
});

// Fallback 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: "Endpoint or file not found" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Dubai Storage Service running on port ${PORT}`);
  console.log(`📁 File Storage Directory: ${STORAGE}`);
  console.log(`🌐 Base Public URL: ${PUBLIC_URL}`);
});
