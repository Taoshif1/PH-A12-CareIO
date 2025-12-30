# Care.IO - Baby Sitting & Elderly Care Service Platform

<div align="center">

![Care.IO Logo](https://img.shields.io/badge/Care.IO-Professional%20Care%20Services-rose?style=for-the-badge)

**A modern web application providing reliable and trusted care services for children, elderly, and family members in Bangladesh.**

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

[Features](#-features) • [Installation](#-getting-started) • [Usage](#-usage) • [API Documentation](#-api-documentation) • [Deployment](#-deployment)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Usage Guide](#-usage-guide)
- [API Documentation](#-api-documentation)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Overview

Care.IO is a comprehensive web application designed to connect families with professional caregivers in Bangladesh. The platform offers three main services:

- **Baby Care**: Professional babysitting services for children
- **Elderly Care**: Compassionate care services for senior family members
- **Sick Care**: Medical and recovery care for patients at home

The application provides a seamless booking experience with dynamic pricing, location-based service selection, and automated email invoicing.

## ✨ Features

### Core Features

- ✅ **Responsive Design**: Fully responsive UI that works on mobile, tablet, and desktop
- ✅ **User Authentication**: Secure email/password authentication with session management
- ✅ **Dynamic Booking System**: 
  - Duration selection (hours/days)
  - Multi-level location selection (Division → District → City → Area)
  - Real-time cost calculation
  - Address input
- ✅ **Booking Management**: 
  - View all bookings
  - Track booking status (Pending/Confirmed/Completed/Cancelled)
  - Cancel bookings
- ✅ **Service Pages**: Detailed service information with pricing and features
- ✅ **Email Invoicing**: Automated email invoices sent upon booking creation
- ✅ **SEO Optimized**: Metadata and Open Graph tags for better search visibility
- ✅ **404 Error Handling**: Custom error page

### UI/UX Features

- 🎨 **Modern Design**: Beautiful gradient backgrounds, smooth animations, and professional UI
- 🎯 **Intuitive Navigation**: Easy-to-use navigation with mobile-responsive menu
- 💫 **Interactive Elements**: Hover effects, transitions, and visual feedback
- 📱 **Mobile-First**: Optimized for mobile devices with touch-friendly interfaces

## 🛠 Tech Stack

### Frontend
- **Framework**: [Next.js 16.1.1](https://nextjs.org/) (React 19.2.3)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) + [DaisyUI 5.5](https://daisyui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

### Backend
- **API Routes**: Next.js API Routes
- **Authentication**: Session-based with HTTP-only cookies
- **Password Hashing**: bcryptjs
- **Email Service**: Nodemailer

### Data Storage
- **Development**: File-based JSON storage
- **Production Ready**: Easy migration to MongoDB/PostgreSQL

## 🚀 Getting Started

### Prerequisites

- **Node.js**: 18.0 or higher
- **npm** or **yarn**: Package manager
- **Git**: Version control

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd PH-A12
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # SMTP Configuration for Email Invoices
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   
   # Node Environment
   NODE_ENV=development
   ```
   
   > **Note**: For Gmail, you need to use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password. Enable 2-Step Verification first, then generate an app password.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
PH-A12/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/route.js
│   │   │   │   ├── register/route.js
│   │   │   │   ├── logout/route.js
│   │   │   │   └── session/route.js
│   │   │   └── bookings/
│   │   │       ├── route.js
│   │   │       └── [id]/route.js
│   │   ├── booking/
│   │   │   └── [serviceId]/page.jsx
│   │   ├── login/page.jsx
│   │   ├── register/page.jsx
│   │   ├── my-bookings/page.jsx
│   │   ├── service/
│   │   │   └── [serviceId]/page.jsx
│   │   ├── page.jsx (Homepage)
│   │   └── layout.jsx
│   ├── components/
│   │   ├── auth/
│   │   │   └── PrivateRoute.jsx
│   │   ├── home/
│   │   │   ├── Banner.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── ServiceCard.jsx
│   │   │   └── Testimonials.jsx
│   │   └── ui/
│   │       ├── Navbar.jsx
│   │       └── Footer.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── data/
│   │   ├── services.js
│   │   ├── locations.js
│   │   └── division.json
│   └── lib/
│       ├── db.js
│       ├── email.js
│       └── utlis.js
├── public/
├── data/ (auto-generated)
├── .env.local (create this)
├── .env.example
├── package.json
└── README.md
```

## 📖 Usage Guide

### For Users

1. **Browse Services**
   - Visit the homepage to see available services
   - Click "View Details" on any service card

2. **Register/Login**
   - Click "Register" to create an account
   - Fill in: NID, Name, Email, Contact, Password
   - Password must be 6+ characters with 1 uppercase and 1 lowercase
   - Or login with existing credentials

3. **Book a Service**
   - Click "Book This Service" on any service detail page
   - Select duration (hours or days)
   - Choose location (Division → District → City → Area)
   - Enter your full address
   - Review total cost
   - Confirm booking

4. **Manage Bookings**
   - Go to "My Bookings" from the navbar
   - View all your bookings with status
   - Cancel pending bookings if needed
   - View service details

### For Developers

#### Adding a New Service

Edit `src/data/services.js`:

```javascript
{
  id: "new-service",
  name: "New Service",
  title: "Professional New Service",
  pricePerDay: 1500,
  pricePerHour: 200,
  // ... other fields
}
```

#### Customizing Email Templates

Edit `src/lib/email.js` to modify the invoice email template.

#### Database Migration

To migrate from file-based storage to a real database:

1. Update `src/lib/db.js` with your database connection
2. Replace file operations with database queries
3. Keep the same function signatures

## 🔌 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "nid": "1234567890",
  "name": "John Doe",
  "email": "john@example.com",
  "contact": "01712345678",
  "password": "Password123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}
```

#### Logout
```http
POST /api/auth/logout
```

#### Get Session
```http
GET /api/auth/session
```

### Booking Endpoints

#### Create Booking
```http
POST /api/bookings
Content-Type: application/json
Cookie: session=<session-id>

{
  "serviceId": "baby",
  "durationType": "hours",
  "durationValue": 8,
  "division": "Dhaka",
  "district": "Dhaka",
  "city": "Dhaka North",
  "area": "Gulshan",
  "address": "House 123, Road 45"
}
```

#### Get User Bookings
```http
GET /api/bookings
Cookie: session=<session-id>
```

#### Cancel Booking
```http
PATCH /api/bookings/[id]
Content-Type: application/json
Cookie: session=<session-id>

{
  "status": "Cancelled"
}
```

## 🔐 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `SMTP_HOST` | SMTP server hostname | Yes* | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP server port | Yes* | `587` |
| `SMTP_USER` | Email address for sending | Yes* | - |
| `SMTP_PASS` | Email app password | Yes* | - |
| `NODE_ENV` | Environment mode | No | `development` |

*Required only if you want email functionality. The app works without it, but invoices won't be sent.

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The application can be deployed to any platform that supports Node.js:
- **Netlify**: Use Next.js build command
- **Railway**: Connect GitHub repo
- **DigitalOcean**: Use App Platform
- **AWS/Azure/GCP**: Use their respective Next.js deployment guides

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Configure SMTP credentials
- [ ] Set up a real database (MongoDB/PostgreSQL)
- [ ] Enable HTTPS
- [ ] Set up error logging
- [ ] Configure CORS if needed
- [ ] Set up rate limiting
- [ ] Add monitoring/analytics

## 🎨 UI Components

The application uses a modern, professional design with:

- **Gradient Backgrounds**: Beautiful color gradients throughout
- **Smooth Animations**: Hover effects and transitions
- **Responsive Cards**: Service cards with shadow effects
- **Professional Typography**: Clear, readable fonts
- **Icon Integration**: Lucide React icons for visual clarity

## 🔮 Future Enhancements

- [ ] Google OAuth integration
- [ ] Stripe payment integration
- [ ] Admin dashboard
- [ ] Payment history tracking
- [ ] Real-time notifications
- [ ] Caregiver profiles and ratings
- [ ] Chat/messaging system
- [ ] Mobile app (React Native)

## 🐛 Troubleshooting

### Email Not Sending

- Verify SMTP credentials in `.env.local`
- Check if App Password is correct (for Gmail)
- Ensure SMTP port is not blocked by firewall

### Session Issues

- Clear browser cookies
- Check if cookies are enabled
- Verify `NODE_ENV` is set correctly

### Build Errors

- Delete `.next` folder and rebuild
- Clear `node_modules` and reinstall
- Check Node.js version (18+)

## 📝 License

This project is for educational purposes.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email support@care.io or create an issue in the repository.

---

<div align="center">

**Made with ❤️ for families in Bangladesh**

[⬆ Back to Top](#careio---baby-sitting--elderly-care-service-platform)

</div>
