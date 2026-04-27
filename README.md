# Tennis Bookings

## Mocked Users

|Role | Email | Username | Pass |
|-----|-------|-----------|------|
|User | user@test.com | testuser | user123 |
|Admin | admin@test.com | testadmin | admin123 |

## 1. Application Purpose

The goal of the application is to help users book tennis courts at a tennis club. Users can view available time slots, make reservations, and manage their bookings. Administrators have additional features to manage the courts themselves.

## 2. User Roles

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

## 3. Public Features

Features accessible without login:
- Home page
- Login page
- Registration page

**Authenticated User Features**

Functionality available after login:
- Book a Court - Browse available time slots and make a reservation
- My Bookings - View and manage upcoming bookings
- Profile - Update account details

**Admin Features**

Additional functionality for admins:
- Manage Courts - View all courts, activate/deactivate them
- Add Court - Create new courts
- Delete Court - Remove courts from the system

## 4. Main Application Flow

1. User opens the Home page
2. User registers or logs in
3. Authenticated user navigates to the booking page
4. User selects an available time slot and court
5. User creates a booking
6. The booking appears in My Bookings
7. User can view, edit, or cancel their bookings

## 5. Data Structure

**Court Object**
- id
- name
- type (Hard / Clay)
- isActive
- createdAt

**Booking Object**
- id
- courtId
- userId
- date
- timeSlot
- createdAt

**User Object**
- id
- email
- password
- role (user / admin)
- createdAt

## 6. Project Architecture

```
tennisbooking/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── authenticate/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── user-profile/
│   │   ├── booking/
│   │   │   ├── my-bookings/
│   │   │   └── slots/
│   │   ├── home/
│   │   ├── shared/
│   │   │   ├── footer/
│   │   │   └── header/
│   │   ├── tennis/
│   │   │   ├── courts/
│   │   │   ├── drop-down/
│   │   │   └── tennis-slots/
│   │   ├── types/
│   │   ├── utils/
│   │   └── welcome/
│   ├── directives/
│   └── environments/
rest-api/
```

## 7. Technologies Used

- Angular 19
- TypeScript
- RxJS
- PrimeNG (UI Components)
- Bootstrap + custom CSS
- REST API (Backend)

## 8. How to Run the Project

### Prerequisites
- Node.js (v18+)
- npm
- Backend API running

### Installation

1. Clone the repository

2. Install dependencies
```bash
npm install
```

3. Configure environment - Update `src/environments/environment.development.ts` with your API URL:
```typescript
export const environment = {
  apiUrl: 'http://localhost:3000/api'
};
```

4. Start the application
```bash
ng serve
```

5. Open the application at http://localhost:4200

---

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

---

# REST API Information

The REST API is located in the `rest-api/` folder.

## Prerequisites

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **Docker Desktop / Rancher** - [Download](https://www.docker.com/products/docker-desktop/)

## Installation & Setup

### Step 1: Navigate to the REST API folder

```bash
cd rest-api
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Start MongoDB with Docker

```bash
docker-compose up -d
```

This starts:
- **MongoDB** on port `27017`
- **Mongo Express** on port `8081` (Web UI for database)

### Step 4: Start the server

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

---

SoftUni Angular Course Project
