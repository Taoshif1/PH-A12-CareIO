# Care.IO - Baby Sitting & Elderly Care Service Platform

Care.IO is a web application that provides reliable and trusted care services for children, elderly, and other family members. The application allows users to find and hire caretakers for different purposes such as babysitting, elderly care, or special care at home.

## Features

- ✅ **Responsive Design**: Mobile, tablet, and desktop supported
- ✅ **User Authentication**: Email & Password, Google Social Login (UI ready)
- ✅ **Dynamic Booking**: Duration, Location (Division, District, City, Area), Address input
- ✅ **Total Cost Calculation**: Automatically calculate based on duration × service charge
- ✅ **Booking Status**: Pending / Confirmed / Completed / Cancelled
- ✅ **My Booking Page**: Users can track their bookings and status
- ✅ **Services Overview**: Baby Care, Elderly Service, Sick People Service
- ✅ **Service Detail Pages**: Individual page for each service with details and Book Service button
- ✅ **Email Invoice**: Sends email invoice when booking is created
- ✅ **Metadata**: SEO optimized with metadata on Home & Service details pages
- ✅ **404 Error Page**: Custom not found page

## Tech Stack

- **Framework**: Next.js 16.1.1
- **UI Library**: React 19.2.3
- **Styling**: Tailwind CSS 4 + DaisyUI
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React
- **Email**: Nodemailer
- **Authentication**: Session-based with cookies
- **Database**: File-based JSON (can be easily replaced with MongoDB/PostgreSQL)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd PH-A12
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
# SMTP Configuration for Email Invoices
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Node Environment
NODE_ENV=development
```

**Note**: For Gmail, you need to use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.js
│   │   │   ├── register/route.js
│   │   │   ├── logout/route.js
│   │   │   └── session/route.js
│   │   └── bookings/
│   │       ├── route.js
│   │       └── [id]/route.js
│   ├── booking/
│   │   └── [serviceId]/page.jsx
│   ├── login/page.jsx
│   ├── register/page.jsx
│   ├── my-bookings/page.jsx
│   ├── service/
│   │   └── [serviceId]/page.jsx
│   └── page.jsx (Homepage)
├── components/
│   ├── auth/
│   │   └── PrivateRoute.jsx
│   ├── home/
│   │   ├── Banner.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── ServiceCard.jsx
│   │   └── Testimonials.jsx
│   └── ui/
│       ├── Navbar.jsx
│       └── Footer.jsx
├── context/
│   └── AuthContext.jsx
├── data/
│   ├── services.js
│   ├── locations.js
│   └── division.json
└── lib/
    ├── db.js
    ├── email.js
    └── utlis.js
```

## Pages & Routes

1. **Homepage** (`/`)
   - Banner/Slider with caregiving motivation
   - About section explaining platform mission
   - Services overview
   - Testimonials/Success metrics

2. **Service Detail Page** (`/service/:service_id`)
   - Detailed information about selected service
   - Book Service button (redirects to login if not authenticated)

3. **Booking Page** (`/booking/:service_id`) - Private Route
   - Select Duration (days/hours)
   - Select Location: Division, District, City, Area / Address
   - Dynamic Total Cost calculation
   - Confirm Booking → Booking saved with status = Pending

4. **Authentication**
   - **Login Page** (`/login`): Email, Password
   - **Registration Page** (`/register`): NID No, Name, Email, Contact, Password validation (6+ char, 1 uppercase, 1 lowercase)
   - Redirects to Booking Page after registration if coming from booking flow

5. **My Booking Page** (`/my-bookings`) - Private Route
   - Shows all bookings with: Service Name, Duration, Location, Total Cost, Status
   - Buttons: View Details / Cancel Booking

6. **Error Page** (`/404`)
   - Not Found message with button to return to Home

## API Routes

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/session` - Get current session

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get user's bookings
- `PATCH /api/bookings/[id]` - Update booking (cancel)

## Environment Variables

All configuration keys should be stored in environment variables. See `.env.example` for reference.

## Database

Currently using file-based JSON storage in the `data/` directory. This can be easily replaced with MongoDB, PostgreSQL, or any other database by updating `src/lib/db.js`.

## Email Configuration

The application sends invoice emails when a booking is created. Configure SMTP settings in your `.env.local` file.

## Future Enhancements (Optional)

- [ ] Stripe Payment System integration
- [ ] Admin Dashboard
- [ ] Payment Histories
- [ ] Google OAuth implementation
- [ ] Real-time notifications
- [ ] Caregiver profiles and ratings

## License

This project is for educational purposes.

## Deployment

The application can be deployed on:
- Vercel (recommended for Next.js)
- Netlify
- Any Node.js hosting platform

Make sure to set environment variables in your hosting platform's dashboard.

---

**Note**: This is a development version. For production, consider:
- Using a proper database (MongoDB, PostgreSQL)
- Implementing proper error logging
- Adding rate limiting
- Setting up proper CORS policies
- Using HTTPS
- Implementing proper session management with secure cookies
