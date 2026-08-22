# API Proxy Setup - Server-Side Calls

## Overview
This frontend now uses **Next.js API routes as a proxy** to make HTTP (not HTTPS) calls to the backend. All client-side requests go through Next.js server first, which then communicates with the backend using HTTP.

## Architecture Flow
```
Browser (Client)
    ↓
Next.js Frontend Server (HTTP or HTTPS)
    ↓
Next.js API Routes (/api/*)
    ↓
Backend Server (HTTP on localhost:5000)
```

## Environment Variables

### Frontend (.env)
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000/api
BACKEND_URL=http://localhost:5000
```

- **NEXT_PUBLIC_BACKEND_URL**: Exposed to the browser - points to Next.js API proxy routes
- **BACKEND_URL**: Server-side only - the actual backend service URL (can be HTTP)

## API Routes

### 1. Specific Auth Endpoints
- `/api/auth/login` - POST request to login
- `/api/auth/register` - POST request to register
- `/api/auth/google` - GET redirect to Google OAuth

These routes are located in:
- `src/app/api/auth/login/route.ts`
- `src/app/api/auth/register/route.ts`
- `src/app/api/auth/google/route.ts`

### 2. Generic Proxy Route
- `/api/proxy/[...path]` - Generic catch-all proxy for any other endpoint

Example usage:
```
/api/proxy/packages → proxies to http://localhost:5000/packages
/api/proxy/users/123 → proxies to http://localhost:5000/users/123
```

This route is located in:
- `src/app/api/proxy/[...path]/route.ts`

Supports: GET, POST, PUT, DELETE, PATCH

## How It Works

### Before (Direct HTTPS calls - ❌ No longer used)
```typescript
const api = axios.create({
  baseURL: 'https://api.triptootravels.com',
});
api.post('/auth/login', data);
```

### After (Server-side HTTP calls - ✅ Current)
```typescript
// Client makes request to local server
const api = axios.create({
  baseURL: '/api',
});
api.post('/auth/login', data);
// ↓ Request goes to: POST /api/auth/login
// ↓ Next.js server makes HTTP call to backend:
// ↓ fetch('http://localhost:5000/auth/login', ...)
```

## Setup Instructions

### 1. Update Backend URL
Make sure your backend is running on HTTP (not HTTPS):
```bash
# Backend should listen on HTTP
# Default: http://localhost:5000
```

### 2. Update .env
```env
# Points to Next.js API proxy (public)
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000/api

# Points to actual backend (server-side only)
BACKEND_URL=http://localhost:5000
```

### 3. Run Frontend
```bash
npm run dev
# Frontend runs on http://localhost:3000
```

### 4. All API calls now go through the proxy
- No HTTPS required
- No CORS issues (server-to-server communication)
- Backend can run on HTTP

## Benefits

✅ **Security**: Backend URL hidden from client  
✅ **Flexibility**: Backend can be HTTP  
✅ **CORS-free**: Server-to-server communication  
✅ **Centralized**: Single place to manage API calls  
✅ **Easy scaling**: Can add middleware, logging, caching  

## Adding New Endpoints

### Option 1: Use Generic Proxy (Recommended)
```typescript
// Client code
api.get('/proxy/products');
api.post('/proxy/products', data);
api.put('/proxy/products/123', data);
```

### Option 2: Create Specific Route
```bash
mkdir -p src/app/api/products
touch src/app/api/products/route.ts
```

```typescript
// src/app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
  const response = await fetch(`${backendUrl}/products`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  return NextResponse.json(await response.json(), { status: response.status });
}
```

## Example: Making API Calls

```typescript
import api from '@/lib/api';

// Uses /api/auth/login (specific route)
const response = await api.post('/auth/login', { email, password });

// Uses /api/proxy/* (generic route)
const packages = await api.get('/proxy/packages');
const users = await api.get('/proxy/users');

// All requests go through Next.js server → HTTP to backend
```

## Troubleshooting

### Issue: "Cannot reach backend"
- Check `BACKEND_URL` is correct in `.env`
- Verify backend is running on HTTP
- Check backend logs for connection attempts

### Issue: "API route not found"
- Ensure the route file exists in `src/app/api/`
- Check route file has proper exports (GET, POST, etc.)
- Try using the generic `/api/proxy/[...path]` route

### Issue: "CORS errors"
- Should be eliminated! Server makes the request
- If still seeing CORS, check backend CORS config

## Migration Notes

- Login/Register components updated to use `/api/auth/*` routes
- Google OAuth updated to use `/api/auth/google` route
- API client (`src/lib/api.ts`) updated to point to `/api` base URL
- Existing components continue to work without changes
