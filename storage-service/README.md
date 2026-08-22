# Dubai Storage Service 📁

Standalone Node.js Express Media & File Storage Microservice for direct browser uploads, replacing Cloudflare R2.

## Features
- **Direct Browser Uploads**: CORS enabled for all origins (`*`) with preflight `OPTIONS` support.
- **Port**: `4000` (default)
- **Storage Location**: `/var/storage/images`
- **Endpoints**:
  - `POST /upload` -> Multipart form single file upload (field: `file`)
  - `POST /upload/batch` -> Multipart form multiple files upload (field: `files`)
  - `PUT /upload/:filename` or `PUT /:filename` -> Direct binary stream upload
  - `GET /:filename` -> Serves stored file with 1-year browser cache headers
  - `DELETE /:filename` -> Removes file from disk
  - `GET /health` -> Health check endpoint

## Quick Start
```bash
npm install
npm start
```
