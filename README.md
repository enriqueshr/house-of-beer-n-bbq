# The House of Beer N' BBQ — Full-Stack Website

A full-stack restaurant website: React + Tailwind CSS frontend, Node.js + Express + PostgreSQL (Prisma) backend.

## Folder Structure

```
Houseofbeernbbq/
├── frontend/                 React + Vite + Tailwind CSS
│   ├── public/images/         Static images (add real brand photos here)
│   ├── src/
│   │   ├── api/client.js      Fetch wrapper for backend API
│   │   ├── components/
│   │   │   ├── layout/        Header, Footer, Layout, Logo
│   │   │   ├── ui/            Shared UI (SectionHeading)
│   │   │   ├── menu/          MenuCard, CategoryFilter
│   │   │   └── admin/         AdminLayout, ProtectedRoute
│   │   ├── pages/              Home, Menu, About, Gallery, Reservations, Contact, Order
│   │   │   └── admin/          AdminLogin, AdminDashboard, AdminMenu, AdminReservations, AdminOrders, AdminContact
│   │   ├── context/            CartContext, AuthContext
│   │   ├── App.jsx             Route definitions
│   │   └── main.jsx            Entry point
│   ├── tailwind.config.js      Brand color palette
│   └── .env.example
├── backend/                  Node.js + Express + Prisma + PostgreSQL
│   ├── prisma/
│   │   ├── schema.prisma       Database models
│   │   └── seed.js             Sample menu data + admin user
│   ├── src/
│   │   ├── config/db.js        Prisma client
│   │   ├── controllers/        menu, reservations, contact, orders, auth
│   │   ├── routes/             REST endpoints per resource
│   │   ├── middleware/         auth (JWT), rateLimiter, errorHandler
│   │   ├── utils/mailer.js     Nodemailer email templates
│   │   └── server.js           App entry point
│   └── .env.example
└── README.md
```

## Tech Stack

- **Frontend:** React 18, Vite, React Router, Tailwind CSS, react-icons
- **Backend:** Node.js, Express, Prisma ORM, PostgreSQL
- **Auth:** JWT (admin only — no customer accounts)
- **Email:** Nodemailer (SMTP — Gmail app password, SendGrid, Mailgun, etc.)
- **Validation:** express-validator
- **Rate limiting:** express-rate-limit (reservations, contact, orders, login)

## Prerequisites

- Node.js 18+
- PostgreSQL 14+ (local install or a hosted instance like Supabase/Neon/Railway)

## Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
- `DATABASE_URL` — your PostgreSQL connection string
- `JWT_SECRET` — any long random string
- `SMTP_*` and `MAIL_FROM` — your email provider credentials (leave blank to skip email sending in dev)
- `RESTAURANT_NOTIFY_EMAIL` — where reservation/order/contact notifications go
- `CLIENT_URL` — the frontend origin (default `http://localhost:5173`) for CORS

Create the database and run migrations:

```bash
npx prisma migrate dev --name init
```

Seed sample menu items and an admin user:

```bash
npm run seed
```

This creates an admin login using `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` env vars if set, otherwise defaults to:
- Email: `admin@houseofbeernbbq.com`
- Password: `ChangeMe123!`

**Change this password immediately** — either edit it directly via Prisma Studio (`npm run prisma:studio`) or add a `PATCH` route if you extend the API.

Start the API:

```bash
npm run dev      # nodemon, auto-restarts on changes
# or
npm start
```

API runs at `http://localhost:5000/api`. Health check: `GET /api/health`.

## Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
```

Edit `.env`:
- `VITE_API_URL` — backend API base URL (default `http://localhost:5000/api`)
- `VITE_GOOGLE_MAPS_EMBED_SRC` — paste your Google Maps "Embed a map" `src` URL for the Contact page

Add real brand assets:
- `public/images/storefront-hero.jpg` — storefront photo for the Home hero section
- `public/images/gallery/*.jpg` — photos referenced in `src/pages/Gallery.jsx` (filenames listed there)

Start the dev server:

```bash
npm run dev
```

Site runs at `http://localhost:5173`.

## Database Schema (Prisma models)

| Model | Purpose |
|---|---|
| `MenuItem` | name, description, price, category enum, image, availability |
| `Reservation` | booking details, status (PENDING/CONFIRMED/CANCELLED/COMPLETED) |
| `ContactSubmission` | contact form messages, read/unread |
| `Order` + `OrderItem` | online orders (pickup/delivery), line items, status |
| `AdminUser` | admin login credentials (bcrypt-hashed password) |

See `backend/prisma/schema.prisma` for full field definitions.

## REST API Overview

| Method | Route | Auth | Purpose |
|---|---|---|---|
| GET | `/api/menu` | Public | List menu items (`?category=` filter) |
| POST/PUT/DELETE | `/api/menu` | Admin | Manage menu items |
| POST | `/api/reservations` | Public (rate-limited) | Create reservation, sends confirmation + admin email |
| GET/PATCH/DELETE | `/api/reservations` | Admin | View/update/delete reservations |
| POST | `/api/contact` | Public (rate-limited) | Submit contact form, notifies admin |
| GET/PATCH/DELETE | `/api/contact` | Admin | View/manage submissions |
| POST | `/api/orders` | Public (rate-limited) | Place an online order |
| GET/PATCH | `/api/orders` | Admin | View/update order status |
| POST | `/api/auth/login` | Public (rate-limited) | Admin login, returns JWT |
| GET | `/api/auth/me` | Admin | Current admin info |

Admin routes require `Authorization: Bearer <token>` from `/api/auth/login`.

## Admin Dashboard

Visit `http://localhost:5173/admin/login`, sign in with the seeded admin credentials. From there you can:
- Manage menu items (create/edit/delete, toggle availability)
- View and update reservation status
- View and update order status
- View and manage contact submissions (mark read / delete)

## Notes

- The hero/gallery images are placeholders — drop real storefront and food photos into `frontend/public/images/` using the paths referenced in `Home.jsx` and `Gallery.jsx`.
- The `Logo` component (`frontend/src/components/layout/Logo.jsx`) is a stylized SVG bull's-head badge stand-in — swap in the real logo file once available.
- Order Online checkout collects order details and emails the restaurant; it does not process payments (payment collected at pickup/delivery). Wire in a payment gateway (Stripe, etc.) if online payment is required later.
