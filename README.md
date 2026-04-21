# Tennis Bookings 

# For REST-Api Information see below 

A web application for booking tennis courts. Built with Angular and PrimeNG.

## What is this?
As a dedicated tennis player i've decide to make a simple Tennis court booking.
This app lets users book tennis courts at a tennis club. Users can see available time slots, make reservations, and manage their bookings. Admins have extra features to manage the courts themselves.

## Features

### For Everyone (Guest)
- View the home page
- Register for an account
- Login

### For Logged-in Users
- **Book a Court** - Browse available time slots and make a reservation
- **My Bookings** - View and manage your upcoming bookings
- **Profile** - Update your account details

### For Admins
- **Manage Courts** - View all courts, activate/deactivate them, or delete them
- **Add Court** - Create new courts (Hard or Clay type)

## Tech Stack

- **Frontend:** Angular 19
- **UI Components:** PrimeNG
- **Styling:** Bootstrap + custom CSS
- **Backend:** REST API (separate project)


## Getting Started

### Prerequisites
- Node.js (v18+)
- npm
- Backend API running

### Installation

```bash
# Install dependencies
npm install

# Start development server
ng serve
```

The app will be available at `http://localhost:4200`

### Environment

Update `src/environments/environment.development.ts` with your API URL:

```typescript
export const environment = {
  apiUrl: 'http://localhost:3000/api'
};
```

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

## User Roles

- **Guest** - Can only see home page and login/register
- **User** - Can book courts and manage their bookings
- **Admin** - Has all user permissions + court management

The role is returned from the API in the user profile (`role: 'admin'` or `role: 'user'`).

## Court Types

- **Hard** - Hard surface courts 
- **Clay** - Clay surface courts

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

## How Authentication Works

1. User logs in with email/password
2. Backend sets a session cookie
3. All API requests include `withCredentials: true` to send the cookie
4. `AuthService` keeps track of the current user and their role
5. `authGuard` protects routes that require login
6. Header menu updates based on login state and role

## Notes

- Courts can be deactivated without deleting them (useful for maintenance)
- The navigation menu changes based on whether you're logged in and if you're an admin
- Session persists via cookies, so refreshing the page keeps you logged in

---


# REST-api for Angular course in SoftUni refactored by Teodor Kostov for Angular Course

For for more details see the READMI.md in angular-workspo repo

## Prerequisites

Before running this server, make sure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **Docker Desktop/ Rancher or simmilar Desctop Containerisation tool** - [Download](https://www.docker.com/products/docker-desktop/)
- **Git** (optional) - [Download](https://git-scm.com/)

## Installation & Setup

### Step 1: Clone the repository (or download the project)

```bash
git clone https://github.com/Teodor-Kostov/angular-workshop
cd REST-api
```

### Step 2: Install Node.js dependencies

```bash
npm install
```

### Step 3: Start the MongoDB database with Docker

The project uses Docker Compose to run MongoDB and Mongo Express (a web-based MongoDB admin interface).

```bash
docker-compose up -d
```

This command starts:
- **MongoDB** on port `27017` - The database server
- **Mongo Express** on port `8081` - Web UI to view/manage database

To check if containers are running:
```bash
docker ps
```

You should see two containers: `rest-api-mongodb` and `rest-api-mongo-express`

### Step 4: Start the Node.js server

```bash
npm start
```

The server will start on `http://localhost:3000`

## Available URLs

| Service | URL | Description |
|---------|-----|-------------|
| REST API | http://localhost:3000/api | Main API endpoint |
| Swagger Docs | http://localhost:3000/api-docs | Interactive API documentation |
| Mongo Express | http://localhost:8081 | Database admin UI |

SoftUni Angular Course Project
