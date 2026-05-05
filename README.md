# 🚀 Portfolio + Admin Dashboard — Next.js 15

A professional, full-stack portfolio website with a sleek Admin Dashboard CMS. Built with **Next.js 15 App Router**, **Tailwind CSS 4**, **MongoDB Atlas**, and **Glassmorphism UI**.

---

## ✨ Features

### Public Portfolio
- **Hero Section** — Animated headline, CTA buttons, live stats
- **Skills Grid** — Categorised tech stack with icons
- **Projects Section** — Fetched from MongoDB, displayed with ProjectCard
- **Contact Form** — Saves to MongoDB, rate-limited to prevent spam
- **Dark / Light Mode** — Persistent theme via `next-themes`
- **SEO Ready** — Open Graph, Twitter Card, metadata API

### Admin Dashboard (`/admin`)
- **Stats Overview** — Total projects, messages, unread count, category breakdown
- **Add Project** — Full form with tech-stack tag picker, image preview, featured toggle
- **Manage Projects** — Search, filter by category/status, inline edit modal, delete confirm
- **Messages** — View all contact submissions, mark as read, reply via email, delete
- **Glassmorphic Dark UI** — Responsive sidebar, mobile-friendly

### Backend API
| Route | Methods | Description |
|-------|---------|-------------|
| `/api/projects` | GET, POST | List & create projects |
| `/api/projects/[id]` | GET, PUT, DELETE | Single project CRUD |
| `/api/contact` | POST | Save contact message |
| `/api/messages` | GET | List all messages |
| `/api/messages/[id]` | PATCH, DELETE | Update / delete message |
| `/api/stats` | GET | Dashboard statistics |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | JavaScript (no TypeScript) |
| Styling | Tailwind CSS 4 |
| Icons | Lucide React |
| Theme | next-themes (dark/light) |
| Animations | Framer Motion |
| Database | MongoDB Atlas + Mongoose |
| Notifications | react-hot-toast |
| Deployment | Vercel (recommended) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier works)
- A modern browser

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.local` and fill in your values:

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
ADMIN_PASSWORD=your_secure_password
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> **Get your MongoDB URI:**
> 1. Go to [mongodb.com/atlas](https://mongodb.com/atlas) → Create free cluster
> 2. Database Access → Create user
> 3. Network Access → Add your IP (or 0.0.0.0/0 for all)
> 4. Clusters → Connect → Drivers → Copy connection string

### 3. Run development server

```bash
npm run dev
```

Visit:
- **Portfolio** → [http://localhost:3000](http://localhost:3000)
- **Admin** → [http://localhost:3000/admin](http://localhost:3000/admin)

### 4. Deploy to Vercel

```bash
npm install -g vercel
vercel deploy
```

Add environment variables in Vercel project settings.

---

## 📁 Project Structure

```
/
├── app/
│   ├── (public)/              # Public pages with Navbar + Footer
│   │   ├── layout.js
│   │   └── page.js            # Home (Hero + Skills + Projects + Contact)
│   ├── admin/                 # Admin Dashboard
│   │   ├── layout.js          # Sidebar navigation
│   │   ├── page.js            # Stats overview
│   │   ├── add-project/
│   │   │   └── page.js        # Create new project
│   │   ├── manage/
│   │   │   └── page.js        # Edit / delete projects
│   │   └── messages/
│   │       └── page.js        # View contact messages
│   ├── api/
│   │   ├── projects/route.js  # GET + POST
│   │   ├── projects/[id]/route.js  # GET + PUT + DELETE
│   │   ├── contact/route.js   # POST
│   │   ├── messages/route.js  # GET
│   │   ├── messages/[id]/route.js  # PATCH + DELETE
│   │   └── stats/route.js     # GET dashboard stats
│   ├── globals.css            # Tailwind 4 + custom CSS
│   ├── layout.js              # Root layout + ThemeProvider
│   └── not-found.js           # Custom 404
├── components/
│   ├── Navbar.js              # Sticky glass navbar
│   ├── Footer.js              # Footer with socials
│   ├── ThemeToggle.js         # Dark/light switcher
│   ├── ProjectCard.js         # Glassmorphic project card
│   ├── ContactForm.js         # Client-side contact form
│   └── ui/
│       └── Badge.js           # Reusable badge component
├── lib/
│   └── mongodb.js             # Mongoose connection with caching
├── models/
│   ├── Project.js             # Project schema
│   └── Message.js             # Contact message schema
├── .env.local                 # Environment variables
├── jsconfig.json              # Path aliases (@/*)
├── next.config.js
└── postcss.config.mjs
```

---

## 🎨 Customisation

### Change personal info
Edit `app/(public)/page.js`:
- Update `SKILLS` array with your technologies
- Update contact links (email, LinkedIn, Twitter)
- Change the name, headline, and bio text

### Change color scheme
The primary color is **Indigo (#6366f1)**. To change it, search and replace throughout the CSS classes:
- `indigo` → your color (e.g., `violet`, `blue`, `cyan`)

### Add admin authentication
Currently the `/admin` route is unprotected. To add basic auth:
1. Add `ADMIN_PASSWORD` to `.env.local`
2. Create a middleware `middleware.js` at the root:

```js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('admin-auth');
  if (!token && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
export const config = { matcher: ['/admin/:path*'] };
```

---

## 📄 License

MIT — free to use and modify.
