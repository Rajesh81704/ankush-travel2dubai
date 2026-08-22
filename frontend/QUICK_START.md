# Quick Start - Server-Side API Proxy

## What Changed?
✅ All API calls now go through **Next.js server** using **HTTP** (not HTTPS)  
✅ No direct calls to backend from browser  
✅ No HTTPS/SSL certificate requirements  

## Running the App

### 1. Backend (Terminal 1)
```bash
# Ensure backend is running on HTTP
cd ../nature-vacation-backend
npm run dev
# Should be listening on: http://localhost:5000
```

### 2. Frontend (Terminal 2)
```bash
cd naturevacation-frontend
npm run dev
# Frontend will be at: http://localhost:3000
```

## Flow
```
You visit http://localhost:3000
  ↓
Login → POST /api/auth/login (Next.js server)
  ↓
Next.js server calls: http://localhost:5000/auth/login (HTTP)
  ↓
Backend responds with user data
  ↓
Frontend logs you in
```

## Environment Variables
Already set in `.env`:
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000/api
BACKEND_URL=http://localhost:5000
```

## Using the API in Components

```typescript
import api from '@/lib/api';

// Login - uses /api/auth/login
const response = await api.post('/auth/login', { email, password });

// Any other endpoint - uses /api/proxy/[...path]
const packages = await api.get('/proxy/packages');
const users = await api.get('/proxy/users/123');
```

## Common Routes
- `GET /api/proxy/packages` → `http://localhost:5000/packages`
- `POST /api/proxy/bookings` → `http://localhost:5000/bookings`
- `PUT /api/proxy/users/1` → `http://localhost:5000/users/1`
- `DELETE /api/proxy/reviews/1` → `http://localhost:5000/reviews/1`

## Need Help?
See `API_PROXY_SETUP.md` for detailed documentation
