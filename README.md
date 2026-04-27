# Tennis Bookings - Monorepo

This project contains both the frontend Angular application and the backend REST API.

## Project Structure

```
TennisBookings/
├── tennisbooking/     # Angular 19 frontend
├── rest-api/          # Node.js REST API backend
└── README.md
```

## Quick Start

### 1. Start the Backend (REST API)

```bash
cd rest-api
npm install
docker-compose up -d   # Start MongoDB
npm start              # Start server on http://localhost:3000
```

### 2. Start the Frontend (Angular)

```bash
cd tennisbooking
npm install
ng serve               # Start on http://localhost:4200
```

## Available URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:4200 | Angular application |
| REST API | http://localhost:3000/api | API endpoint |
| Swagger Docs | http://localhost:3000/api-docs | API documentation |
| Mongo Express | http://localhost:8081 | Database admin UI |

---

## Application Purpose

The goal of the application is to help users book tennis courts at a tennis club. Users can view available time slots, make reservations, and manage their bookings. Administrators have additional features to manage the courts themselves.

## User Roles

**Guest (Not Authenticated User)**
- Can view the home page
- Can register for an account
- Can login

**Authenticated User**
- Can browse available time slots and book a court
- Can view and manage their upcoming bookings
- Can update their profile details

**Admin**
- Has all authenticated user permissions
- Can view all courts and activate/deactivate them
- Can create new courts (Hard or Clay type)
- Can delete courts

## Routes

| Path | Component | Access |
|------|-----------|--------|
| `/home` | Home | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/slots` | Book a Court | Logged in |
| `/my-bookings` | My Bookings | Logged in |
| `/profile` | User Profile | Logged in |
| `/courts` | Manage Courts | Admin |
| `/courts/add` | Add Court | Admin |

## API Endpoints

### Auth
- `POST /login` - Login
- `POST /register` - Register
- `POST /logout` - Logout
- `GET /users/profile` - Get profile
- `PUT /users/profile` - Update profile

### Bookings
- `GET /bookings/my` - User's bookings
- `GET /bookings/busy` - Busy time slots
- `POST /bookings` - Create booking
- `PUT /bookings/:id` - Update booking

### Courts
- `GET /courts` - All courts
- `GET /courts/:id` - Single court
- `POST /courts` - Create court (admin)
- `PUT /courts/:id` - Update court (admin)
- `DELETE /courts/:id` - Delete court (admin)

## Technologies

**Frontend (tennisbooking/)**
- Angular 19
- TypeScript
- RxJS
- PrimeNG (UI Components)
- Bootstrap + custom CSS

**Backend (rest-api/)**
- Node.js
- Express
- MongoDB
- Docker

## Prerequisites

- Node.js (v18+)
- npm
- Docker Desktop / Rancher (for MongoDB)

---

SoftUni Angular Course Project
