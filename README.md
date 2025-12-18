# 📝 Blogs – Full Stack Blog Application

A full-stack blog management platform built using **React.js**, **Express.js**, **PostgreSQL**, and **JWT authentication**.  
Users can sign up, create and manage blogs with image uploads, while admins can view or delete blogs and users.

---

## 🚀 Features

### 👤 User Features
- Register and log in securely using JWT  
- Create, edit, and delete your own blogs  
- Upload images when creating blogs  
- Update profile details (username, password, etc.)  
- View all blogs posted by other users  

### 🛠️ Admin Features
- Admin dashboard to manage the platform  
- View all users and blogs  
- Delete any blog or user account  
- Access to special admin-only routes  

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React.js (Axios, React Router) |
| **Backend** | Node.js + Express.js |
| **Database** | PostgreSQL |
| **Authentication** | JSON Web Token (JWT) |
| **File Uploads** | Multer |
| **Styling** | CSS / Tailwind (optional) |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/Blogs.git
cd Blogs
````

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

#### Create a `.env` file in `/backend`:

```env
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/blogsdb
JWT_SECRET=your_secret_key
```

#### Start the backend server:

```bash
npm start
```

Server runs on `http://localhost:5000`

---

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

React app runs on `http://localhost:3000`

---

## 🗄️ Database Schema Overview

### Users Table

| Column   | Type               | Description              |
| -------- | ------------------ | ------------------------ |
| id       | SERIAL PRIMARY KEY | Unique user ID           |
| username | VARCHAR            | User name                |
| email    | VARCHAR            | User email               |
| password | VARCHAR            | Hashed password          |
| is_admin | BOOLEAN            | Role flag (true = admin) |

### Blogs Table

| Column     | Type               | Description          |
| ---------- | ------------------ | -------------------- |
| id         | SERIAL PRIMARY KEY | Unique blog ID       |
| user_id    | INTEGER            | References users(id) |
| title      | VARCHAR            | Blog title           |
| content    | TEXT               | Blog content         |
| image_url  | VARCHAR            | Optional image link  |
| created_at | TIMESTAMP          | Blog creation time   |

---

## 🔐 Authentication Flow

1. User signs up → JWT token is created.
2. Token stored in localStorage for session management.
3. Protected routes check for valid token before granting access.
4. Admin routes require both valid token and `is_admin` flag.

---

## 🧠 Learning Purpose

This project was built for **learning full-stack web development** concepts:

* React + Express integration
* PostgreSQL CRUD operations
* JWT authentication & role-based authorization
* RESTful API structure
* Image uploads using Multer

---

## 👨‍💻 Author

**MOSALIKANTI SRINIVASA KALYAN**


---

