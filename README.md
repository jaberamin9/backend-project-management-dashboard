# Backend Setup Guide

## Step 1: Install Dependencies
```sh
npm install
```

## Step 2: Set Up Environment Variables
Create a `.env` file in the root of your project and add the following:
```
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZjJhNGYxNzctOGMwMi00OTQzLTgyYjUtNjUyZDdhMjJkNjVmIiwidGVuYW50X2lkIjoiN2Q5NDc5NzNjZmM5ZTJkNjFhOTA3NzI4MjNjODk1NmUwZjk1YzVhYzljYmM1YjRhYWE2YzY2NmM4MDU0OWExYiIsImludGVybmFsX3NlY3JldCI6ImIwOTZhYTNhLTcwNDUtNDk0MS1iNmYxLTI3YzFkZTlmMjlkMSJ9.571oX7iF1vu5VxCciWE_xnHmwhGbidR67Z32Uijt2UA"
JWT_SECRET="jaberamin9"
```

## Step 3: Run Database Migrations
```sh
npx prisma migrate dev --name init
```

## Step 4: Start the Server
```sh
npm start
```

The backend will start on `http://localhost:5000/api`. Ensure your frontend is pointing to this URL.




# Project Management Dashboard API Documentation

## Base URL
```
http://localhost:5000/api
```

---

## Authentication

### 1. Sign Up
**Endpoint:** `POST /auth/sign-up`

**Request Body:**
```json
{
    "name": "Jaber Amin",
    "email": "jaberamin9@gmail.com",
    "password": "123456"
}
```

**Response:**
- Returns the created user details with a token.

### 2. Sign In
**Endpoint:** `POST /auth/sign-in`

**Request Body:**
```json
{
    "email": "jaberamin9@gmail.com",
    "password": "123456"
}
```

**Response:**
- Returns user details and authentication token.

### 3. Get Active User
**Endpoint:** `GET /auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
- Returns the logged-in user’s details.

---

## Users

### 4. Get All Users (Admin Only)
**Endpoint:** `GET /users`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `search`: Filter users by name or email.
- `page`: Page number (default: 1).
- `limit`: Number of users per page.
- `sortBy`: Sort by `email` or other fields.
- `order`: `asc` or `desc`.

### 5. Delete User by ID
**Endpoint:** `DELETE /users/{id}`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
- Deletes the user with the given ID.

### 6. Update User Role by ID
**Endpoint:** `PATCH /users/{id}/role`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "role": "admin"
}
```

---

## Projects

### 7. Create New Project
**Endpoint:** `POST /projects`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
    "title": "Demo Project",
    "description": "Test Demo Project",
    "dueDate": "2023-10-03",
    "assignedUsers": ["user-id"]
}
```

### 8. Update Project by ID
**Endpoint:** `PUT /projects/{id}`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
    "title": "Updated Project",
    "description": "Updated Description",
    "dueDate": "2025-10-04",
    "assignedUsers": ["user-id"]
}
```

### 9. Get All Projects
**Endpoint:** `GET /projects`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `search`: Filter by project name.
- `page`: Page number.
- `limit`: Number per page.
- `sortBy`: Field to sort by.
- `order`: `asc` or `desc`.
- `status`: Project status.

### 10. Get Assigned Projects for a User
**Endpoint:** `GET /projects/user/{userId}`

**Headers:**
```
Authorization: Bearer <token>
```

### 11. Delete Project by ID
**Endpoint:** `DELETE /projects/{id}`

**Headers:**
```
Authorization: Bearer <token>
```

### 12. Get Project by ID
**Endpoint:** `GET /projects/{id}`

**Headers:**
```
Authorization: Bearer <token>
```

### 13. Submit Project by ID
**Endpoint:** `PATCH /projects/submit-project/{id}`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
    "projectUrl": "www.github.com/example"
}
```

### 14. Change Project Status by ID
**Endpoint:** `PATCH /projects/change-project-status/{id}`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
    "status": "Active"
}
```

---

## Statistics

### 15. Get Statistics for Admin
**Endpoint:** `GET /stats`

**Headers:**
```
Authorization: Bearer <token>
```

### 16. Get Statistics for a User
**Endpoint:** `GET /stats/{userId}`

**Headers:**
```
Authorization: Bearer <token>
```