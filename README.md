📝 Blog Management System

A full-stack **Blog Management System** built with **Node.js**, **Express.js**, **PostgreSQL**, and **EJS**. This platform allows users to create, edit, delete, and interact with blogs through likes, dislikes, and comments. It also features user authentication using **JWT** and image upload support.

## 🚀 Features

- 🔐 JWT-based User Authentication
- ✍️ Create, Read, Update, Delete (CRUD) Blog Posts
- 📸 Image Upload Support (via multer)
- 💬 Commenting System
- 👍 Like / 👎 Dislike Functionality
- 🔒 Protected Routes (Only authenticated users can access certain features)
- 🧼 Clean UI using EJS Templates
- 📁 Modular Codebase (routes, controllers, models, middleware)

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS (Embedded JavaScript Templates)
- **Database:** PostgreSQL
- **Authentication:** JSON Web Token (JWT), bcrypt
- **File Uploads:** multer


## 📁 Folder Structure


├── public/
│   └── uploads/           # Uploaded images
├── views/                 # EJS templates
├── routes/                # Route handlers
├── controllers/           # Business logic
├── models/                # Database queries
├── middleware/            # JWT and other middlewares
├── db/                    # PostgreSQL configuration
├── app.js                 # Entry point
└── package.json



⚙️ Getting Started

 1. Clone the Repository
```bash
git clone https://github.com/MSKalyan/Blog.git
cd Blog
````

 2. Install Dependencies

```bash
npm install
```

 3. Configure Environment Variables

Create a `.env` file in the root directory:

```
PORT=3000
JWT_SECRET=your_jwt_secret_key
DB_USER=your_pg_user
DB_PASSWORD=your_pg_password
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=your_database_name
```

 4. Set Up PostgreSQL Database

Create the database and necessary tables according to your schema.

 5. Start the Server

```bash
npm start
```

Visit `http://localhost:3000` in your browser.



 📌 Future Enhancements

* User profile pages
* Admin dashboard
* Blog categories and tags
* Rich text/WYSIWYG editor




## 📜 License

This project is licensed under the [MIT License](LICENSE).


## 👨‍💻 Author

**Kalyan M S**
GitHub: [@MSKalyan](https://github.com/MSKalyan)

