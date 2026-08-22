# Production Deployment Guide

## ✅ Production Ready

This setup is **fully production-ready**. The proxy architecture actually provides better security and flexibility for production.

## Architecture

```
Production Flow:
┌─────────────────────────────────────────────────────────────┐
│ User's Browser (HTTPS)                                      │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTPS Request
                      ↓
┌─────────────────────────────────────────────────────────────┐
│ Your Frontend Server (Next.js on HTTPS)                     │
│ - Handles routing                                            │
│ - Renders pages                                              │
│ - Runs API proxy routes                                      │
└──────────────────┬──────────────────────────────────────────┘
                   │ HTTP Request (Internal Network)
                   ↓
┌─────────────────────────────────────────────────────────────┐
│ Your Backend Server (HTTP on 103.138.96.92:8000)            │
│ - API endpoints                                              │
│ - Database logic                                             │
└─────────────────────────────────────────────────────────────┘
```

## Deployment Steps

### 1. Frontend Deployment (Vercel, Netlify, or Your Server)

```bash
# Build
npm run build

# Deploy
# The build includes all API proxy routes
# No extra configuration needed
```

### 2. Environment Variables

Set these environment variables on your hosting platform:

```
BACKEND_URL=http://103.138.96.92:8000
```

That's it! The `NEXT_PUBLIC_BACKEND_URL` is only for development reference.

### 3. Verify on Production

After deployment, test:
- Login at `https://yourdomain.com/auth/login` (client-side)
- The request goes through `/api/auth/login` (Next.js server)
- Then to `http://103.138.96.92:8000/auth/login` (backend)

## Why This Works Great for Production

✅ **Security**
- Backend URL never exposed to browser
- No client-side HTTPS requirement for backend
- All sensitive operations happen on server

✅ **Performance**
- Server-to-server communication is fast
- Can add caching at proxy level
- Single connection pool to backend

✅ **Flexibility**
- Change backend URL without redeploying frontend
- Can run backend on HTTP internally
- Can use load balancing for backend

✅ **CORS-Free**
- No browser CORS restrictions
- Server-to-server communication

## Platform-Specific Instructions

### Vercel (Recommended for Next.js)

1. **Connect repo** to Vercel
2. **Set environment variable:**
   - Go to Settings → Environment Variables
   - Add: `BACKEND_URL=http://103.138.96.92:8000`
3. **Deploy** - Vercel automatically builds and deploys

### Heroku

```bash
# Set env var
heroku config:set BACKEND_URL=http://103.138.96.92:8000

# Deploy
git push heroku main
```

### Your Own Server (VPS, AWS, etc.)

```bash
# Build
npm run build

# Install dependencies
npm install --production

# Start
NODE_ENV=production npm start
```

### Docker (Universal)

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY .next ./
COPY public ./public

ENV NODE_ENV=production
ENV BACKEND_URL=http://103.138.96.92:8000

EXPOSE 3000

CMD ["npm", "start"]
```

## Testing Production Build Locally

```bash
# Build production bundle
npm run build

# Run production server
NODE_ENV=production BACKEND_URL=http://103.138.96.92:8000 npm start

# Visit http://localhost:3000
```

## Troubleshooting Production Issues

### Issue: API requests failing

**Check 1:** Verify `BACKEND_URL` env var is set correctly
```bash
# On Vercel, Heroku, etc., check env vars in dashboard
# Should be: http://103.138.96.92:8000
```

**Check 2:** Verify backend is running and accessible
```bash
curl http://103.138.96.92:8000/packages
```

**Check 3:** Check Next.js logs
- Vercel: Check deployment logs
- Heroku: `heroku logs --tail`
- VPS: Check application logs

### Issue: CORS errors (shouldn't happen)

If you see CORS errors in production:
1. This means requests are reaching browser (wrong!)
2. Verify `BACKEND_URL` is set in environment
3. Verify proxy routes exist at `/api/proxy/*`

### Issue: 502/503 errors

This means Next.js can't reach the backend:
1. Verify backend is running
2. Verify `BACKEND_URL` is correct and accessible
3. Check firewall/network settings

## Monitoring

Add these logs to monitor API traffic:

```bash
# On server, check proxy logs
tail -f /var/log/next-js-app.log | grep "PROXY"
```

Current logs (development mode only):
- `[ApiClient]` - Client-side request logs
- `[PROXY]` - Server-side proxy logs

These won't show in production (optimized away).

## Performance Tips

1. **Use a CDN** - Cache static assets with Cloudflare or similar
2. **Enable compression** - Next.js does this by default
3. **Monitor response times** - Use tools like Datadog or New Relic
4. **Scale backend** - If API calls are slow, scale backend separately

## Security Checklist

- ✅ Backend URL not exposed to client
- ✅ All API calls go through server
- ✅ No direct backend access from browser
- ✅ Can use HTTP internally safely
- ✅ Frontend is HTTPS to users

## Summary

This setup is production-ready and actually provides better security and flexibility than direct API calls. Simply set the `BACKEND_URL` environment variable on your hosting platform and deploy!
