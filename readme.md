The frontend is deployed on Vercel:
- **URL**: `https://eventora-zeta.vercel.app`

### Backend (Render)

The backend is deployed on Render:
- **URL**: `https://events-and-activities.onrender.com`

# 🎉 Eventora - Event Management Platform

A full-stack event management platform where users can discover, join, and manage events. Hosts can create and manage events, while admins have complete control over the platform with analytics and user management capabilities.

## 🎯 Project Overview

Eventora is a comprehensive event management system that connects event organizers (hosts) with participants. The platform provides:

- **For Users**: Browse events, join activities, make payments, leave reviews, and manage their profile
- **For Hosts**: Create and manage events, track participants, view payment history, and update event status
- **For Admins**: Complete platform oversight with analytics dashboard, user/host management, event management, and revenue tracking

## 🛠️ Technologies Used

### Frontend
- **Framework**: Next.js 16 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI, Shadcn/ui
- **State Management**: React Hooks
- **Charts**: Recharts
- **Form Validation**: Zod
- **Notifications**: Sonner (Toast)
- **Icons**: Lucide React
- **Authentication**: JWT (JSON Web Tokens)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT, bcrypt
- **Payment**: Stripe
- **File Upload**: Cloudinary, Multer
- **Validation**: Zod

### DevOps & Deployment
- **Frontend Hosting**: Vercel
- **Backend Hosting**: Render
- **Database**: Render PostgreSQL
- **Version Control**: Git & GitHub

## ✨ Features

### User Features
- 🔐 User authentication (Register/Login)
- 🎫 Browse and search events
- 💳 Secure payment integration with Stripe
- ⭐ Leave reviews and ratings for events
- 👤 Profile management with password change
- 📜 View payment history
- 🚪 Leave events

### Host Features
- 🎪 Create and manage events
- 📊 View event participants
- 💰 Track payment history and revenue
- 🔄 Update event status (OPEN, FULL, COMPLETED, CANCELLED)
- 📈 Dashboard with hosted events overview

### Admin Features
- 📊 Comprehensive analytics dashboard
  - Total users, hosts, events, and revenue
  - Monthly user growth charts
  - Monthly event creation trends
  - Monthly payment analytics
  - Top event categories
- 👥 User management (view, edit role, change status, delete)
- 🎭 Host management (view, edit role, change status, delete)
- 🎪 Event management (view, update status, delete)
- 🔍 Advanced filtering and search capabilities

## 📁 Project Structure

```
eventora/
├── event-activities-frontend/     # Next.js Frontend
│   ├── src/
│   │   ├── app/                   # App router pages
│   │   ├── components/            # React components
│   │   │   ├── admin/            # Admin components
│   │   │   ├── host/             # Host components
│   │   │   ├── modals/           # Modal components
│   │   │   ├── modules/          # Feature modules
│   │   │   ├── profile/          # Profile components
│   │   │   └── shared/           # Shared components
│   │   ├── hooks/                # Custom React hooks
│   │   ├── lib/                  # Utility functions
│   │   ├── service/              # API services
│   │   ├── types/                # TypeScript types
│   │   └── zodValidations/       # Zod schemas
│   └── package.json
│
├── events-activites-server/       # Express.js Backend
│   ├── src/
│   │   ├── app/
│   │   │   ├── middlewares/      # Express middlewares
│   │   │   ├── modules/          # Feature modules
│   │   │   │   ├── admin/       # Admin module
│   │   │   │   ├── auth/        # Authentication
│   │   │   │   ├── events/      # Events management
│   │   │   │   ├── participant/ # Participant management
│   │   │   │   ├── payment/     # Payment processing
│   │   │   │   ├── review/      # Review system
│   │   │   │   └── user/        # User management
│   │   │   ├── routes/          # API routes
│   │   │   └── shared/          # Shared utilities
│   │   ├── prisma/              # Prisma schema
│   │   └── server.ts            # Entry point
│   └── package.json
│
├── DEPLOYMENT_CHECKLIST.md       # Deployment checklist
├── QUICK_START_RENDER.md         # Quick deployment guide
├── RENDER_DEPLOYMENT_GUIDE.md    # Detailed deployment guide
└── readme.md                      # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Stripe account (for payments)
- Cloudinary account (for image uploads)

### Installation

#### 1. Clone the repository

```bash
git clone <repository-url>
cd eventora
```

#### 2. Setup Backend

```bash
cd events-activites-server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your credentials
# DATABASE_URL, JWT_SECRET, STRIPE_SECRET_KEY, CLOUDINARY credentials

# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Start development server
npm run dev
```

Backend will run on `http://localhost:5000`

#### 3. Setup Frontend

```bash
cd event-activities-frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Update .env.local with your API URL
# NEXT_PUBLIC_API_URL=http://localhost:5000/v1/api

# Start development server
npm run dev
```

Frontend will run on `http://localhost:3000`

#### 4. Setup Stripe Webhook (for local development)

```bash
# In a new terminal, navigate to backend folder
cd events-activites-server

# Start Stripe webhook listener
npm run stripe:webhook
```

## 🔑 Login Credentials

### Admin Account
- **Email**: `admin@example.com`
- **Password**: `admin123`

### Host Account
- **Email**: `host@example.com`
- **Password**: `host123`

### User Account
- **Email**: `user@example.com`
- **Password**: `user123`

> **Note**: These are demo credentials. In production, use strong passwords and change them immediately.

## 📡 API Overview

### Base URL
- **Local**: `http://localhost:5000/v1/api`
- **Production**: `https://your-backend-url.onrender.com/v1/api`

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | User login |
| POST | `/auth/change-password` | Change password |
| GET | `/auth/me` | Get current user |

### Event Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/events` | Get all events |
| GET | `/events/:id` | Get event by ID |
| POST | `/events` | Create event (Host only) |
| PATCH | `/events/:id` | Update event (Host only) |
| DELETE | `/events/:id` | Delete event (Host/Admin) |
| PATCH | `/events/:id/status` | Update event status |

### Participant Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/participants/join/:eventId` | Join event |
| POST | `/participants/leave/:id` | Leave event |
| GET | `/participants/event/:eventId` | Get event participants |

### Payment Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/payment/event/:eventId` | Get event payment history |
| GET | `/payment/user/:userId` | Get user payment history |
| POST | `/webhook` | Stripe webhook handler |

### Review Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/review/post-review` | Create review |
| PATCH | `/review/:id` | Update review |
| DELETE | `/review/:id` | Delete review |
| GET | `/review/event/:eventId` | Get event reviews |

### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get user by ID |
| PATCH | `/users/:id` | Update user profile |
| GET | `/users/:id/joined-events` | Get user's joined events |

### Admin Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/dashboard-stats` | Get dashboard analytics |
| GET | `/admin/users/:id/details` | Get user details with stats |
| PATCH | `/admin/users/:id/status` | Update user status |
| PATCH | `/admin/users/:id/role` | Update user role |
| DELETE | `/admin/user/:id` | Delete user |

## 🌐 Deployment

### Frontend (Vercel)

The frontend is deployed on Vercel:
- **URL**: `https://eventora-zeta.vercel.app`

### Backend (Render)

The backend is deployed on Render:
- **URL**: `https://events-and-activities.onrender.com`

### Database (Render PostgreSQL)

PostgreSQL database is hosted on Render.

### Deployment Guides

For detailed deployment instructions, refer to:
- `QUICK_START_RENDER.md` - Quick 5-minute deployment guide
- `RENDER_DEPLOYMENT_GUIDE.md` - Comprehensive deployment guide
- `DEPLOYMENT_CHECKLIST.md` - Step-by-step checklist

## 🔐 Environment Variables

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/v1/api
```

### Backend (.env)

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/eventora

# JWT
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URLs
STRIPE_SUCCESS_URL=http://localhost:3000/payment/success
STRIPE_CANCEL_URL=http://localhost:3000/payment/cancel

# Server
NODE_ENV=development
PORT=5000
```

## 📝 Key Features Implementation

### Payment Integration
- Stripe Checkout for secure payments
- Webhook handling for payment status updates
- Payment history tracking
- Revenue analytics

### File Upload
- Cloudinary integration for image uploads
- Profile pictures and event images
- Optimized image delivery

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (USER, HOST, ADMIN)
- Protected routes and API endpoints

### Real-time Updates
- Router refresh for instant UI updates
- Toast notifications for user feedback

## 🐛 Known Issues & Solutions

### Stripe Webhook Issue
If webhook events are not updating the database:
1. Ensure `payment_intent.succeeded` event is handled in `payment.service.ts`
2. Verify webhook secret is correct in production
3. Check Stripe dashboard for webhook delivery status

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Fakhruddin**

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Stripe for payment processing
- Cloudinary for image management
- Radix UI for accessible components
- All open-source contributors

---

**Happy Event Managing! 🎉**
