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