# Nexara Dashboard Template

A modern, animated React dashboard template built with the latest technologies.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` folder.

## 🎨 Tech Stack

- **React 18** with TypeScript
- **Vite** for blazing fast development
- **Tailwind CSS v4** with custom theme
- **Framer Motion** for animations
- **Recharts** for data visualization
- **React Router** for navigation
- **Lucide React** for icons

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/       # Sidebar, Header, Layout
│   └── ui/           # Reusable UI components
├── pages/            # All dashboard pages
├── data/             # Demo data
└── index.css         # Tailwind config & custom styles
```

## 🎯 Features

- 📊 Dashboard with animated stats and charts
- 💬 Multi-channel messaging interface
- 👥 Customer database management
- ⚡ Automation flow builder
- 📢 Campaign management
- 📈 Analytics dashboard
- 🔍 Cookieless tracking (Nitro X)
- 🤝 Affiliate management (Nitro Collab)
- 🔌 Integrations page
- ⚙️ Settings page

## 🎨 Customization

### Colors
Edit `src/index.css` to customize the color palette in the `@theme` section.

### Fonts
Fonts are imported from Google Fonts:
- **Inter** for body text
- **Plus Jakarta Sans** for headings

### Demo Data
All demo data is in `src/data/demoData.ts` - replace with real API calls.

## 🔗 Backend Integration

This is currently a **frontend-only template** with demo data. To connect to a real backend:

### Option 1: Vercel Serverless Functions (Recommended - FREE)
Perfect for getting started quickly with the same platform:
- Create `/api` folder in project root
- Add TypeScript functions (see `examples/api-serverless-example.ts`)
- Deploy automatically with your frontend
- **Zero cost** for small apps

### Option 2: Separate Backend (Railway, Render, Fly.io)
For more complex backends with databases:
- Node.js + Express + PostgreSQL
- Python + FastAPI + PostgreSQL
- **FREE tier** available on all platforms

### Full Integration Guide
See **[BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md)** for:
- Complete setup instructions
- Free hosting options comparison
- API integration patterns
- Database setup examples
- Authentication flow
- Environment variables
- CORS configuration
- Deployment strategy

### Quick Example
```typescript
// src/services/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
});

// src/services/customers.ts
export const customerAPI = {
  getAll: () => api.get('/customers'),
  create: (data) => api.post('/customers', data),
};
```

## 📝 Environment Variables

No environment variables required for the template. Add your own as needed for API connections.

## 🔧 Development Tools

- TypeScript for type safety
- ESLint for code quality
- Hot Module Replacement (HMR)
- Fast Refresh

---

**Built with ❤️ for Nexara**
