# SpurNitro Dashboard Template

A modern, animated React dashboard template built for the **SpurNow + Nitro Commerce** unified platform.

## 🎨 Design Features

- **Modern Orange/Cream Color Palette** - Warm, friendly, and professional
- **Inter + Plus Jakarta Sans Fonts** - Clean and readable typography
- **Smooth Animations** - Framer Motion micro-interactions throughout
- **Glassmorphism Effects** - Modern UI trends with backdrop blur
- **Custom Gradients** - Beautiful gradient backgrounds and buttons
- **Responsive Layout** - Works on desktop, tablet, and mobile

## 🚀 Tech Stack

- **React 18** with TypeScript
- **Vite** for blazing fast development
- **Tailwind CSS v4** with custom theme configuration
- **Framer Motion** for animations
- **Recharts** for data visualization
- **React Router** for navigation
- **Lucide React** for icons
- **React Hot Toast** for notifications

## 📦 Project Structure

```
dashboard-template/
├── src/
│   ├── components/
│   │   ├── layout/       # Sidebar, Header, Layout
│   │   └── ui/           # Reusable UI components
│   ├── pages/            # All dashboard pages
│   │   ├── dashboard/    # Home dashboard
│   │   ├── conversations/# Multi-channel messaging
│   │   ├── customers/    # Customer database
│   │   ├── automations/  # Flow builder
│   │   ├── campaigns/    # Broadcast campaigns
│   │   ├── analytics/    # Analytics dashboard
│   │   ├── nitro-x/      # Cookieless tracking
│   │   ├── nitro-collab/ # Affiliate management
│   │   ├── integrations/ # Platform integrations
│   │   └── settings/     # Settings page
│   ├── data/             # Demo data
│   └── index.css         # Tailwind config & custom styles
└── samples/              # Reference screenshots
```

## 🎯 Features Implemented

### 1. Dashboard Home
- 4 animated stat cards
- Conversation trends chart (Area chart)
- Revenue growth chart (Bar chart)
- Messages by channel (Pie chart)
- Recent conversations list
- Quick action buttons

### 2. Conversations
- Multi-channel inbox (WhatsApp, Instagram, Facebook)
- Real-time chat interface
- Customer sidebar with details
- Message status indicators
- Channel badges

### 3. Customers
- Advanced data table
- Search and filter
- Customer profiles with tags
- Order history
- Contact information display

### 4. Automations
- Flow builder preview
- Pre-built templates
- Automation status management
- Execution statistics
- Visual flow visualization

### 5. Campaigns
- Broadcast campaign cards
- Performance metrics
- Status tracking
- Revenue attribution

### 6. Analytics
- Key performance metrics
- Interactive charts
- Growth indicators

### 7. Nitro X (NEW)
- High-intent user tracking
- Consent management
- Visitor identification stats
- Cookieless tracking metrics

### 8. Nitro Collab
- Affiliate performance dashboard
- Top performers list
- Click and conversion tracking
- Revenue and commission stats

### 9. Integrations
- Connected platforms display
- Integration status badges
- Quick connect buttons

### 10. Settings
- Profile, notifications, security, billing sections
- Clean settings cards

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the dashboard template:
```bash
cd dashboard-template
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` folder.

## 🎨 Customization

### Colors
Edit `src/index.css` to customize the color palette in the `@theme` section:
- `--color-primary-*` - Orange accent colors
- `--color-cream-*` - Background colors
- `--color-navy-*` - Text colors
- `--color-teal-*` - Secondary accent

### Fonts
Fonts are imported from Google Fonts in `src/index.css`:
- **Inter** for body text
- **Plus Jakarta Sans** for headings (similar to Satoshi)

### Components
All reusable components are in `src/components/`:
- Layout components for structure
- UI components for common elements
- Easy to extend and customize

### Demo Data
All demo data is centralized in `src/data/demoData.ts`:
- Stats and metrics
- Conversations
- Customers
- Campaigns
- Automations
- Analytics data

## 📝 Notes

- This is a **UI template only** - no backend integration
- All data is static/demo data
- All interactions are front-end only
- Ready to be connected to real APIs

## 🎯 Next Steps

1. **Connect to Backend APIs** - Replace demo data with real API calls
2. **Add Authentication** - Implement login/logout functionality
3. **Real-time Updates** - Add WebSocket connections for live data
4. **State Management** - Add Redux/Zustand for complex state
5. **Form Validation** - Add forms with validation
6. **Advanced Filters** - Implement real filtering logic
7. **Export Features** - Add CSV/PDF export functionality
8. **Mobile Optimization** - Further refine mobile experience

## 🌟 Key Highlights

- ✨ **Smooth Animations** - Every interaction feels delightful
- 🎨 **Unique Design** - Stands out from typical CRM dashboards
- 📱 **Responsive** - Works on all screen sizes
- ⚡ **Fast** - Built with Vite for optimal performance
- 🔧 **Maintainable** - Clean code structure and TypeScript
- 🎯 **Modern** - Uses latest React and Tailwind CSS v4

## 📄 License

This template is created for SpurNow + Nitro Commerce platform.

---

**Built with ❤️ using React + TypeScript + Tailwind CSS v4**
