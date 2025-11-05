# API Integration Examples

This folder contains example code for integrating the Nexara Dashboard with various backend solutions.

## Files

### `api-serverless-example.ts`
Example Vercel serverless function for handling customer API endpoints.

**To use**:
1. Create `/api` folder in your project root (same level as `dashboard-template`)
2. Copy this file to `/api/customers.ts`
3. Install dependencies: `npm install @vercel/node`
4. Deploy: Vercel automatically deploys `/api/*` as serverless functions
5. Access at: `https://yourdomain.vercel.app/api/customers`

**Features**:
- GET /api/customers - List customers with search and pagination
- POST /api/customers - Create new customer
- PUT /api/customers?id=123 - Update customer
- DELETE /api/customers?id=123 - Delete customer
- CORS handling
- Error handling
- Type-safe with TypeScript

## Coming Soon

- `api-express-example/` - Full Express.js backend example
- `api-fastapi-example/` - Python FastAPI backend example
- `api-trpc-example/` - tRPC end-to-end typesafe API example
- `database-schemas/` - PostgreSQL, MongoDB schema examples
- `auth-examples/` - JWT, OAuth integration examples

## Quick Start (Vercel Serverless)

1. **Install Vercel CLI** (optional, for local testing):
```bash
npm install -g vercel
```

2. **Create API folder**:
```bash
mkdir api
cp examples/api-serverless-example.ts api/customers.ts
```

3. **Test locally**:
```bash
vercel dev
# Opens at http://localhost:3000
# API available at http://localhost:3000/api/customers
```

4. **Deploy**:
```bash
git add .
git commit -m "Add serverless API"
git push
# Vercel auto-deploys
```

5. **Update frontend** (`src/services/api.ts`):
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? 'https://yourdomain.vercel.app/api'
    : 'http://localhost:3000/api'
  );
```

## Database Options with Vercel

### Option 1: Vercel Postgres (Easiest)
```bash
# In Vercel dashboard:
# Storage → Create → Postgres
# Automatically adds POSTGRES_URL to env vars
```

```typescript
// In your API function
import { sql } from '@vercel/postgres';

const customers = await sql`
  SELECT * FROM customers
  WHERE user_id = ${userId}
  ORDER BY created_at DESC
`;
```

### Option 2: Supabase (Free PostgreSQL + Auth)
```bash
npm install @supabase/supabase-js
```

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

const { data: customers } = await supabase
  .from('customers')
  .select('*')
  .order('created_at', { ascending: false });
```

### Option 3: MongoDB Atlas (Free NoSQL)
```bash
npm install mongodb
```

```typescript
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);
await client.connect();

const customers = await client
  .db('nexara')
  .collection('customers')
  .find({})
  .toArray();
```

## Environment Variables

Add in Vercel dashboard (Settings → Environment Variables):

```
# Database
POSTGRES_URL=postgresql://user:pass@host:5432/db
# or
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/nexara
# or
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=eyJxxx...

# JWT
JWT_SECRET=your-super-secret-key-change-this-in-production

# External APIs
STRIPE_SECRET_KEY=sk_test_...
SENDGRID_API_KEY=SG...
```

## Need Help?

- Main docs: See `/BACKEND_INTEGRATION.md`
- Vercel docs: https://vercel.com/docs/functions/serverless-functions
- Questions: Open a GitHub issue
