# Backend Integration Guide

This guide explains how to integrate the Nexara Dashboard with a backend API for production use.

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Free Hosting Options](#free-hosting-options)
3. [Local Development Setup](#local-development-setup)
4. [API Integration Patterns](#api-integration-patterns)
5. [Environment Variables](#environment-variables)
6. [CORS Configuration](#cors-configuration)
7. [Authentication Setup](#authentication-setup)
8. [Deployment Strategy](#deployment-strategy)

---

## Architecture Overview

### Current Setup (Frontend Only)
```
┌─────────────────┐
│  Vercel (Free)  │
│                 │
│  React App      │
│  (Demo Data)    │
└─────────────────┘
```

### Production Setup (Frontend + Backend)
```
┌─────────────────┐         ┌──────────────────┐
│  Vercel (Free)  │ ◄────► │  Backend (Free)  │
│                 │  HTTPS  │                  │
│  React App      │  API    │  Node.js/Python  │
│  (Real Data)    │ Calls   │  Database        │
└─────────────────┘         └──────────────────┘
```

---

## Free Hosting Options

### Option 1: Vercel Serverless Functions (Recommended)
**Best for**: Small to medium APIs, serverless architecture

**Pros**:
- ✅ Same platform as frontend (Vercel)
- ✅ Zero configuration needed
- ✅ Automatic HTTPS
- ✅ No CORS issues (same domain)
- ✅ Generous free tier

**Free Tier Limits**:
- 100 GB bandwidth/month
- 100 hours serverless execution/month
- Unlimited API routes

**Setup**:
```bash
# Create API route in your project
mkdir -p api
touch api/customers.ts

# Vercel automatically deploys /api/* as serverless functions
```

**Example API Route** (`api/customers.ts`):
```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // Database connection
  const customers = await getCustomersFromDB();

  res.status(200).json({
    success: true,
    data: customers
  });
}
```

**Deployment**: Automatic with `git push`

---

### Option 2: Railway (Recommended for Full Backend)
**Best for**: Full Node.js/Python backends with databases

**Pros**:
- ✅ Free PostgreSQL, MySQL, MongoDB, Redis
- ✅ Automatic deployments from GitHub
- ✅ Environment variables management
- ✅ Built-in metrics and logs
- ✅ Easy scaling

**Free Tier**:
- $5 free credit/month (enough for small apps)
- 500 hours compute/month
- PostgreSQL database included

**Setup**:
```bash
# 1. Create account at railway.app
# 2. Connect GitHub repo
# 3. Add services: Node.js + PostgreSQL
# 4. Set environment variables
# 5. Deploy automatically on git push
```

**URL**: `https://your-app.up.railway.app/api`

---

### Option 3: Render
**Best for**: Python (FastAPI/Django) or Node.js backends

**Free Tier**:
- 750 hours/month free (enough for 1 app)
- PostgreSQL database (90 days, then deleted if inactive)
- Automatic HTTPS
- Custom domains

**Limitations**:
- Spins down after 15 min inactivity (slow first request)

---

### Option 4: Fly.io
**Best for**: Dockerized applications

**Free Tier**:
- 3 shared-cpu VMs
- 3GB persistent storage
- 160GB outbound bandwidth

---

## Local Development Setup

### Frontend (Port 5173)
```bash
cd dashboard-template
npm run dev
# Opens at http://localhost:5173
```

### Backend (Port 3001)
```bash
# Option A: Node.js/Express
cd backend
npm run dev
# Runs at http://localhost:3001

# Option B: Python/FastAPI
cd backend
uvicorn main:app --reload --port 3001
# Runs at http://localhost:3001
```

### Development Workflow
1. **Run backend first**: `npm run dev` (port 3001)
2. **Run frontend second**: `npm run dev` (port 5173)
3. Frontend proxies API requests to backend
4. Both hot-reload on changes

---

## API Integration Patterns

### 1. Create API Service Layer

**File**: `src/services/api.ts`
```typescript
// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Axios instance with defaults
import axios from 'axios';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### 2. Create API Endpoints

**File**: `src/services/customers.ts`
```typescript
import { api } from './api';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export const customerAPI = {
  // Get all customers
  getAll: async (): Promise<Customer[]> => {
    const response = await api.get('/customers');
    return response.data;
  },

  // Get single customer
  getById: async (id: string): Promise<Customer> => {
    const response = await api.get(`/customers/${id}`);
    return response.data;
  },

  // Create customer
  create: async (data: Omit<Customer, 'id'>): Promise<Customer> => {
    const response = await api.post('/customers', data);
    return response.data;
  },

  // Update customer
  update: async (id: string, data: Partial<Customer>): Promise<Customer> => {
    const response = await api.put(`/customers/${id}`, data);
    return response.data;
  },

  // Delete customer
  delete: async (id: string): Promise<void> => {
    await api.delete(`/customers/${id}`);
  },
};
```

### 3. Use React Query (Recommended)

**Install**:
```bash
npm install @tanstack/react-query
```

**Setup** (`src/main.tsx`):
```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
```

**Usage** (`src/pages/customers/Customers.tsx`):
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customerAPI } from '../../services/customers';

export default function Customers() {
  const queryClient = useQueryClient();

  // Fetch customers
  const { data: customers, isLoading, error } = useQuery({
    queryKey: ['customers'],
    queryFn: customerAPI.getAll,
  });

  // Create customer mutation
  const createMutation = useMutation({
    mutationFn: customerAPI.create,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading customers</div>;

  return (
    <div>
      {customers?.map(customer => (
        <div key={customer.id}>{customer.name}</div>
      ))}
    </div>
  );
}
```

---

## Environment Variables

### Frontend (.env)
```bash
# Development
VITE_API_URL=http://localhost:3001/api
VITE_APP_ENV=development

# Production (Vercel automatically sets these)
VITE_API_URL=https://api.yourdomain.com
VITE_APP_ENV=production
```

### Backend (.env)
```bash
# Server
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/nexara

# JWT
JWT_SECRET=your-super-secret-key-here
JWT_EXPIRES_IN=7d

# CORS
ALLOWED_ORIGINS=http://localhost:5173,https://your-vercel-app.vercel.app

# External APIs
STRIPE_SECRET_KEY=sk_test_...
SENDGRID_API_KEY=SG...
```

### Vercel Environment Variables
Add in Vercel dashboard: **Settings → Environment Variables**
```
VITE_API_URL = https://api.yourdomain.com (Production)
VITE_API_URL = https://staging-api.yourdomain.com (Preview)
VITE_API_URL = http://localhost:3001/api (Development)
```

---

## CORS Configuration

### Backend (Express.js)
```javascript
const cors = require('cors');

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
  'http://localhost:5173',
  'http://localhost:3000',
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies
}));
```

### Backend (FastAPI/Python)
```python
from fastapi.middleware.cors import CORSMiddleware

allowed_origins = [
    "http://localhost:5173",
    "https://your-vercel-app.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Authentication Setup

### JWT Token Flow
```typescript
// src/contexts/AuthContext.tsx
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    const { token, user } = response.data;

    // Store token
    localStorage.setItem('authToken', token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### Protected Routes
```typescript
// src/components/ProtectedRoute.tsx
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}

// App.tsx
<Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
    <Route index element={<Dashboard />} />
    <Route path="customers" element={<Customers />} />
  </Route>
</Routes>
```

---

## Deployment Strategy

### Development
```
Frontend: localhost:5173 (Vite dev server)
Backend: localhost:3001 (Local server)
Database: Local PostgreSQL/MySQL
```

### Staging/Preview
```
Frontend: https://preview-xyz.vercel.app (Vercel Preview)
Backend: https://staging-api.railway.app (Railway Preview)
Database: Staging database
```

### Production
```
Frontend: https://dashboard.nexara.com (Vercel Production)
Backend: https://api.nexara.com (Railway Production)
Database: Production database with backups
```

---

## Recommended Tech Stack

### Backend Options

**Option A: Node.js + Express + PostgreSQL**
```
- Express.js (REST API)
- Prisma ORM (Database)
- PostgreSQL (Database)
- JWT (Authentication)
- Zod (Validation)
```

**Option B: Node.js + tRPC + PostgreSQL**
```
- tRPC (End-to-end typesafe API)
- Prisma ORM
- PostgreSQL
- No need for manual API types!
```

**Option C: Python + FastAPI + PostgreSQL**
```
- FastAPI (Modern Python framework)
- SQLAlchemy (ORM)
- PostgreSQL
- Pydantic (Validation)
```

---

## Database Schema Example

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Customers table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  company VARCHAR(255),
  tags TEXT[],
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Conversations table
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id),
  channel VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'open',
  last_message TEXT,
  unread_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id),
  sender_type VARCHAR(50) NOT NULL, -- 'customer' or 'agent'
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Testing Strategy

### 1. API Testing (Backend)
```bash
# Install
npm install --save-dev jest supertest

# Test file: __tests__/customers.test.ts
import request from 'supertest';
import app from '../src/app';

describe('Customers API', () => {
  it('should get all customers', async () => {
    const response = await request(app).get('/api/customers');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
```

### 2. Integration Testing (Frontend)
```bash
# Install
npm install --save-dev @testing-library/react vitest

# Test file: src/pages/__tests__/Customers.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Customers from '../Customers';

test('renders customer list', async () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <Customers />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
```

---

## Cost Estimation (Free Tier)

### Vercel (Frontend)
- ✅ **FREE** for unlimited personal projects
- 100 GB bandwidth/month
- Unlimited sites

### Railway (Backend + Database)
- ✅ **FREE** $5 credit/month
- Enough for:
  - 1 Node.js API (512MB RAM)
  - 1 PostgreSQL database (1GB storage)
  - ~30-40k requests/month

### Total Monthly Cost
- **$0** for small projects (under free tier limits)
- **$5-10/month** when you exceed free tier

---

## Next Steps

1. **Choose Backend Framework**: Node.js/Express or Python/FastAPI
2. **Set up Railway**: Create account, connect GitHub
3. **Create Database Schema**: PostgreSQL tables
4. **Build API Endpoints**: REST or tRPC
5. **Integrate Frontend**: Replace demo data with API calls
6. **Add Authentication**: JWT tokens
7. **Deploy**: Push to GitHub, automatic deployment

---

## Support

For integration help:
- Backend templates: Check `examples/` folder (coming soon)
- Issues: Open GitHub issue
- Documentation: See `/docs` folder

---

**Last Updated**: November 2025
**Version**: 1.0.0
