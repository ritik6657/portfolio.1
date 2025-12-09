Full-Stack Portfolio Application

Hosted Live At: https://ritiksdike.vercel.app

A modern, production-ready full-stack web application built with Next.js 14, Supabase, and ShadCN UI. Features a beautiful landing page, complete admin panel with CRUD operations, dual theme system, and image upload with cropping.
## ✨ Features

### Landing Page
- 🎨 Hero section with consultation form
- 💡 Why Choose Us section
- 📖 About Us section
- 🎯 Dynamic Projects showcase
- 👥 Client testimonials
- 📧 Contact form
- 📬 Newsletter subscription
- 🌓 **Dual theme system** (Blue/White ↔ Orange/Dark)

### Admin Panel
- 🔐 Secure authentication with Supabase Auth
- 📊 Dashboard with overview cards
- ✏️ **Full CRUD operations** for:
  - Projects (Create, Read, Update, Delete)
  - Clients (Create, Read, Update, Delete)
  - Contact requests (Read only)
  - Newsletter subscribers (Read only)
- 🖼️ Image upload with cropping (450×350 for projects, 1:1 for clients)
- ✅ Server-side validation with Zod
- 🎨 Beautiful UI with ShadCN components

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Components**: ShadCN UI
- **Forms**: React Hook Form + Zod validation
- **Language**: TypeScript
- **Analytics**: Vercel Analytics

### Backend
- **Database**: Supabase PostgreSQL
- **Storage**: Supabase Storage
- **Authentication**: Supabase Auth
- **API**: Next.js Server Actions

## 🚀 Quick Start

### Prerequisites
- Node.js 20.9.0 or higher
- npm or pnpm
- Supabase account

### 1. Clone & Install

bash
git clone <your-repo-url>
cd full-stack-web-app
npm install


### 2. Environment Setup

Create a `.env` file:

env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SECRET_KEY=your_secret_key


### 3. Database Setup

See [SETUP_DATABASE.md](./SETUP_DATABASE.md) for complete instructions.

**Quick version:**
1. Go to Supabase Dashboard → SQL Editor
2. Run `scripts/setup-db.sql`
3. Create storage bucket named `projects` (public)
4. Run `scripts/fix-storage-policies.sql`
5. Create admin user in Authentication

### 4. Run Development Server

bash
./dev.sh
# or
npm run dev


Visit: **http://localhost:3000**

## 📁 Project Structure


full-stack-web-app/
├── app/
│   ├── actions/          # Server actions (CRUD operations)
│   ├── admin/            # Admin panel pages
│   ├── auth/             # Authentication pages
│   ├── globals.css       # Global styles + themes
│   ├── layout.tsx        # Root layout with ThemeProvider
│   └── page.tsx          # Landing page
├── components/
│   ├── admin/            # Admin-specific components
│   ├── landing/          # Landing page sections
│   ├── ui/               # ShadCN UI components
│   ├── image-uploader.tsx
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
├── lib/
│   └── supabase/         # Supabase client configs
├── scripts/
│   ├── setup-db.sql      # Database schema
│   └── fix-storage-policies.sql
├── middleware.ts         # Auth middleware
└── README.md


## 🎨 Theme System

The application includes a dual theme system:

### Light Theme (Blue/White)
- Professional blue color scheme
- Clean white background
- Perfect for business presentations

### Dark Theme (Orange/Red)
- Warm orange/red accents
- Rich dark background
- Comfortable for extended viewing

**Toggle**: Click the sun/moon icon in the navbar  
**Persistence**: Theme choice saved in localStorage

## 🔐 Authentication

### Admin Login
- **URL**: http://localhost:3000/auth/login
- **Default**: admin@gmail.com / admin@123

### Protected Routes
All `/admin/*` routes require authentication. Unauthenticated users are redirected to login.

## 📊 Database Schema

### Tables

**projects**
- id (UUID, PK)
- name (TEXT)
- description (TEXT)
- image_url (TEXT)
- created_at, updated_at (TIMESTAMP)

**clients**
- id (UUID, PK)
- name (TEXT)
- designation (TEXT)
- description (TEXT)
- image_url (TEXT)
- created_at, updated_at (TIMESTAMP)

**contact_requests**
- id (UUID, PK)
- full_name (TEXT)
- email (TEXT)
- mobile (TEXT)
- city (TEXT)
- created_at (TIMESTAMP)

**newsletter_subscribers**
- id (UUID, PK)
- email (TEXT, UNIQUE)
- subscribed_at (TIMESTAMP)

### Storage Buckets
- **projects**: Public bucket for project and client images

## 🧪 Available Scripts

bash
npm run dev         # Start development server
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Run ESLint
npm run type-check  # Check TypeScript types

# Helper scripts
./dev.sh            # Dev server with nvm
./build.sh          # Build with nvm


## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SECRET_KEY`
4. Deploy!

## 📚 Documentation

- **[SETUP_DATABASE.md](./SETUP_DATABASE.md)** - Complete database setup guide
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment instructions
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - API reference

## 🔧 Configuration

### TypeScript
- Strict mode enabled
- Path aliases configured (`@/*`)
- No build errors ignored

### ESLint
- Next.js recommended rules
- TypeScript support
- Custom rules for code quality

### Tailwind CSS
- v4 with PostCSS plugin
- Custom theme colors
- Premium animations

## 🎯 Features Checklist

- [x] Landing page with 8 sections
- [x] Admin panel with dashboard
- [x] Full CRUD for projects
- [x] Full CRUD for clients
- [x] Contact form submissions
- [x] Newsletter subscriptions
- [x] Image upload with cropping
- [x] Theme switching (light/dark)
- [x] Authentication & authorization
- [x] Server-side validation
- [x] Responsive design
- [x] Premium styling with animations
- [x] TypeScript throughout
- [x] Zero vulnerabilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

**"Bucket not found" error**
- Solution: Create `projects` storage bucket in Supabase Dashboard

**"RLS policy" error on upload**
- Solution: Run `scripts/fix-storage-policies.sql`

**"useTheme must be used within ThemeProvider"**
- Solution: Already fixed in latest version

**Theme doesn't persist**
- Solution: Check browser localStorage is enabled

**Login doesn't work**
- Solution: Create admin user in Supabase Authentication

## 📞 Support

For issues and questions:
- Check [SETUP_DATABASE.md](./SETUP_DATABASE.md)
- Review [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- Open an issue on GitHub

## ⭐ Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Supabase](https://supabase.com/)
- UI components from [ShadCN](https://ui.shadcn.com/)
- Analytics by [Vercel](https://vercel.com/analytics)

---

**Made with ❤️ using modern web technologies**
