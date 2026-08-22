# Travel 2 Dubai Platform

A unified monorepo repository containing all services for the **Travel 2 Dubai** booking & management platform.

---

## 📁 Repository Structure

```
travel2dubai/
├── frontend/          # Client-facing web portal (Next.js 15, Tailwind CSS, Redux)
├── backend/           # Core REST API server (Express.js, TypeScript, MongoDB, Mongoose)
├── admin/             # Admin management control panel (Next.js 15, Turbopack, Redux)
└── storage-service/   # Dedicated media file storage microservice (Express.js, Multer)
```

---

## ⚙️ Components Overview

### 1. Frontend (`/frontend`)
- **Framework**: Next.js 15 (App Router)
- **Features**: Package browsing, custom itinerary builder, visa applications, B2B agent portal, inquiry forms, dynamic reviews.
- **Port**: Default `3000`

### 2. Backend (`/backend`)
- **Framework**: Express.js with TypeScript
- **Database**: MongoDB (`travel2d_travel2dubai`)
- **Features**: Authentication (JWT & Passport), packages & preset management, visa requests, booking inquiries, admin role control.
- **Port**: Default `9000` (or `5001` for TripToo deployment)

### 3. Admin Control Panel (`/admin`)
- **Framework**: Next.js 15 (App Router)
- **Features**: Complete dashboard for managing packages, flight & hotel presets, visa packages, customer inquiries, B2B agents, and customer reviews.
- **Port**: Default `3001`

### 4. Storage Microservice (`/storage-service`)
- **Framework**: Node.js & Express.js
- **Features**: Handles image file uploads for packages, flight logos, hotel banners, and sightseeings.
- **Port**: Default `4000`

---

## 🚀 Quick Start (Local Development)

### 1. Clone the repository
```bash
git clone https://github.com/Rajesh81704/travel2dubai.git
cd travel2dubai
```

### 2. Install dependencies for each sub-project
```bash
cd frontend && npm install && cd ..
cd backend && npm install && cd ..
cd admin && npm install && cd ..
cd storage-service && npm install && cd ..
```

### 3. Setup Environment Files
Copy `.env.example` to `.env` in each module:
```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
cp admin/.env.example admin/.env
cp storage-service/.env.example storage-service/.env
```

### 4. Run Services locally
```bash
# Start Backend
npm run dev:backend

# Start Storage Service
npm run dev:storage

# Start Frontend
npm run dev:frontend

# Start Admin Dashboard
npm run dev:admin
```
