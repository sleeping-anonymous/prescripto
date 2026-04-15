# 🏥 Prescripto – Doctor Appointment System

deployed at: https://prescripto-pi-one.vercel.app/

admin: https://prescripto-admin-beta-opal.vercel.app/

## backend at render using uptime robot

## 📌 Overview

Prescripto is a full-stack web application that enables:

- Users to browse doctors and book appointments
- Doctors to manage appointments
- Admin to manage doctors and platform data

The system demonstrates complete end-to-end flow of a production-style web application including authentication, role-based access, API communication, and cloud-based media storage.

---

## 🏗️ System Architecture

```
Client (React)
   ↓
API Layer (Axios)
   ↓
Server (Node.js + Express)
   ↓
Database (MongoDB Atlas)
   ↓
Media Storage (Cloudinary)
```

---

## 🔐 Authentication & Authorization

### Flow

1. Credentials submitted from client
2. Backend validates using `bcrypt`
3. JWT token generated:

```js
jwt.sign({ id: user._id }, process.env.JWT_SECRET);
```

4. Token stored in localStorage
5. Token sent in headers for protected routes
6. Middleware verifies token and extracts identity

---

## 👥 Roles in System

### User

- Register / Login
- Browse doctors
- Book appointments
- View appointment history

### Doctor

- Login
- View assigned appointments
- Mark appointments as completed or cancelled
- Update profile

### Admin

- Add doctors
- Manage doctors
- View all appointments

---

## 🔄 Core Application Flow

### 1. Doctor Listing

```
GET /api/doctor/list
```

- Fetches all doctors
- Excludes sensitive fields
- Returns list to client

---

### 2. Appointment Booking

```
POST /api/user/book-appointment
```

Creates appointment:

```js
{
  (userId, docId, slotDate, slotTime, userData, docData);
}
```

---

### 3. Data Strategy

Stores snapshot data (`userData`, `docData`) instead of using populate.

Benefits:

- Faster reads
- Reduced DB queries
- Simplified frontend rendering

---

### 4. Doctor Appointment Fetch

```
GET /api/doctor/appointments
```

- Middleware extracts doctor ID
- Fetches appointments using:

```js
appointmentModel.find({ docId });
```

---

### 5. Appointment Actions

#### Complete Appointment

```
POST /api/doctor/complete-appointment
```

Updates:

```js
isCompleted: true;
```

---

#### Cancel Appointment

```
POST /api/doctor/cancel-appointment
```

Updates:

```js
cancelled: true;
```

---

### 6. Doctor Profile Fetch

```
GET /api/doctor/profile
```

Fetches doctor data using:

```js
findById(docId);
```

---

## 🧱 Backend Structure

```
backend/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── config/
└── server.js
```

---

## ⚙️ Key Backend Concepts

- JWT Authentication
- Middleware-based route protection
- REST API design
- MongoDB data modeling
- Cloudinary integration

---

## 🎨 Frontend Structure

```
frontend/
├── pages/
├── components/
├── context/
└── assets/
```

---

## 🧠 Frontend Concepts

- Context API for global state
- Axios for API calls
- useEffect for lifecycle control

---

## 🔍 Filtering Logic

```js
doc.speciality.toLowerCase() === speciality.toLowerCase();
```

---

## 🌐 API Design

- RESTful endpoints
- Modular routing
- Controller-based architecture

---

## 🧪 Health Check Endpoint

```
GET /health
```

Used for uptime monitoring and keeping backend active.

---

## ⚙️ Environment Variables

Create `.env` in backend:

```
MONGODB_URI=
JWT_SECRET=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET_KEY=
```

---

## 🚀 Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas
- Media Storage: Cloudinary

---

## ⚠️ Limitations

- No pagination
- No real-time updates
- Basic validation
- No payment integration

---

## 🔮 Future Improvements

- Payment gateway integration
- Notifications
- UI/UX improvements
- Advanced filtering

---

## 📌 System Summary

```
Client → Auth → API → Middleware → Controller → DB → Response → UI
```

---
