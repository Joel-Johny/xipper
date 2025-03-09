# Hotel Booking System

A full-stack web application for hotel booking and Aadhaar-based check-in.

## Features

- User authentication
- Browse and search hotels
- Book rooms
- Web check-in with Aadhaar verification
- View booking history

## Tech Stack

**Backend:**
- Node.js with Express
- PostgreSQL database
- Prisma ORM
- JWT authentication

**Frontend:**
- React
- Tailwind CSS
- React Router
- Axios

## Quick Start

### Backend

```bash
cd backend
npm install
# Set up .env with DATABASE_URL and JWT_SECRET
npx prisma migrate dev
npm run dev
```

### Frontend

```bash
cd frontend
npm install
# Create .env with VITE_BACKEND_URL=http://localhost:5000
npm run dev
```

## API Endpoints

- Authentication: `/api/auth/register`, `/api/auth/login`
- Hotels: `/api/hotels`, `/api/hotels/:id`
- Bookings: `/api/bookings`, `/api/bookings/user`, `/api/bookings/:id/checkin`

## Database Schema

- **User**: User account details
- **Hotel**: Hotel information
- **Booking**: User reservations
- **CheckIn**: Family members' Aadhaar details
