# API Usage Examples

## Using the Proxy in Components

### Example 1: Fetching Packages

**Before (Direct HTTPS - ❌ Old)**
```typescript
const response = await axios.get('https://api.triptootravels.com/packages');
```

**After (Server-side HTTP - ✅ New)**
```typescript
import api from '@/lib/api';

const { data } = await api.get('/proxy/packages');
// Calls: GET /api/proxy/packages
// Next.js forwards to: http://localhost:5000/packages
```

---

### Example 2: Creating a Booking

**Before (Direct HTTPS - ❌ Old)**
```typescript
const response = await axios.post(
  'https://api.triptootravels.com/bookings',
  { packageId: 1, userId: 5 }
);
```

**After (Server-side HTTP - ✅ New)**
```typescript
import api from '@/lib/api';

const { data } = await api.post('/proxy/bookings', { 
  packageId: 1, 
  userId: 5 
});
// Calls: POST /api/proxy/bookings
// Next.js forwards to: http://localhost:5000/bookings (with body)
```

---

### Example 3: Authentication Flow

**Before (Direct HTTPS - ❌ Old)**
```typescript
// Login
const res = await axios.post(
  'https://api.triptootravels.com/auth/login',
  { email, password }
);

// Register
const res = await axios.post(
  'https://api.triptootravels.com/auth/register',
  { name, email, password }
);
```

**After (Server-side HTTP - ✅ New)**
```typescript
import api from '@/lib/api';

// Login (specific route: /api/auth/login)
const res = await api.post('/auth/login', { email, password });

// Register (specific route: /api/auth/register)
const res = await api.post('/auth/register', { name, email, password });

// OR use generic proxy:
const res = await api.post('/proxy/auth/login', { email, password });
```

---

### Example 4: Full Component Example

```typescript
'use client';
import { useState } from 'react';
import api from '@/lib/api';

interface Package {
  id: number;
  name: string;
  price: number;
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      // This calls: GET /api/proxy/packages
      // Which forwards to: http://localhost:5000/packages
      const { data } = await api.get('/proxy/packages');
      setPackages(data);
    } catch (error) {
      console.error('Failed to fetch packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePackage = async (id: number) => {
    try {
      // This calls: DELETE /api/proxy/packages/123
      // Which forwards to: http://localhost:5000/packages/123
      await api.delete(`/proxy/packages/${id}`);
      setPackages(p => p.filter(pkg => pkg.id !== id));
    } catch (error) {
      console.error('Failed to delete package:', error);
    }
  };

  return (
    <div>
      <button onClick={fetchPackages} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Packages'}
      </button>
      
      <ul>
        {packages.map(pkg => (
          <li key={pkg.id}>
            {pkg.name} - ${pkg.price}
            <button onClick={() => deletePackage(pkg.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

### Example 5: Handling Errors

```typescript
import api from '@/lib/api';
import { AxiosError } from 'axios';

interface ApiResponse {
  success: boolean;
  message: string;
}

const handleLogin = async (email: string, password: string) => {
  try {
    // Calls: POST /api/auth/login
    const res = await api.post<ApiResponse>('/auth/login', { 
      email, 
      password 
    });
    
    if (res.data.success) {
      console.log('Login successful:', res.data);
    }
  } catch (err) {
    const axiosErr = err as AxiosError<ApiResponse>;
    const message = 
      axiosErr.response?.data?.message || 
      'An error occurred';
    console.error('Login failed:', message);
  }
};
```

---

### Example 6: GET with Query Parameters

**Before (Direct HTTPS - ❌ Old)**
```typescript
const response = await axios.get(
  'https://api.triptootravels.com/packages?page=1&limit=10'
);
```

**After (Server-side HTTP - ✅ New)**
```typescript
import api from '@/lib/api';

// Method 1: Using params object (Recommended)
const { data } = await api.get('/proxy/packages', {
  page: 1,
  limit: 10
});

// Method 2: URL query string
const { data } = await api.get('/proxy/packages?page=1&limit=10');

// Both call: GET /api/proxy/packages?page=1&limit=10
// Which forwards to: http://localhost:5000/packages?page=1&limit=10
```

---

### Example 7: PUT/PATCH Requests

**Update a resource (PUT)**
```typescript
import api from '@/lib/api';

const { data } = await api.put('/proxy/users/123', {
  name: 'John Doe',
  email: 'john@example.com'
});
// Calls: PUT /api/proxy/users/123
// Which forwards to: http://localhost:5000/users/123
```

**Partial update (PATCH)**
```typescript
const { data } = await api.patch('/proxy/users/123', {
  name: 'Jane Doe'  // Only update name
});
// Calls: PATCH /api/proxy/users/123
// Which forwards to: http://localhost:5000/users/123
```

---

## API Routes Available

### Specific Routes (Pre-configured)
- ✅ `POST /api/auth/login` → `http://localhost:5000/auth/login`
- ✅ `POST /api/auth/register` → `http://localhost:5000/auth/register`
- ✅ `GET /api/auth/google` → Redirects to backend OAuth

### Generic Proxy Route (Catch-all)
- ✅ `GET /api/proxy/[...path]`
- ✅ `POST /api/proxy/[...path]`
- ✅ `PUT /api/proxy/[...path]`
- ✅ `DELETE /api/proxy/[...path]`
- ✅ `PATCH /api/proxy/[...path]`

### Usage
```typescript
// Specific routes
await api.post('/auth/login', data);
await api.post('/auth/register', data);

// Generic proxy - any endpoint
await api.get('/proxy/packages');
await api.post('/proxy/bookings', data);
await api.put('/proxy/users/1', data);
await api.delete('/proxy/reviews/1');
```

---

## Environment Variables

### Client-visible (can be used in browser)
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000/api
```

### Server-only (secure)
```
BACKEND_URL=http://localhost:5000
```

---

## Migration Checklist

- [x] Update `.env` with new URLs
- [x] Create API proxy routes in `src/app/api/`
- [x] Update API client in `src/lib/api.ts`
- [x] Update Login component to use `/api/auth/` routes
- [ ] Update other components using `NEXT_PUBLIC_BACKEND_URL`
- [ ] Test all API calls in development
- [ ] Test with backend running on HTTP

---

## Performance Notes

✅ **Pros of server-side proxy:**
- No SSL/HTTPS certificate needed
- Single server-to-server connection (more efficient)
- Can add caching, compression at proxy level
- Better error handling
- Secure - backend URL hidden from client

⚠️ **Minor considerations:**
- Extra hop (client → proxy server → backend)
- Usually negligible (~1-5ms overhead)
- Mitigated by keep-alive connections
