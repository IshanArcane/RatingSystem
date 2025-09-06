📌 RateMyStore
RateMyStore is a role-based store rating web application built with Express.js (backend), Sequelize + MySQL (database), and React.js (frontend).
It provides secure authentication, role-based dashboards, store management, and rating functionalities with filtering and sorting.

🚀 Features
🔑 Authentication & Security

JWT-based authentication (stored in HTTP-only cookies).
Role-based authorization (ADMIN, USER, STORE_OWNER).
Password hashing with bcrypt.
Input sanitization and validations (frontend + backend).

👥 User Roles & Functionalities


Admin

Manage users & stores (CRUD).
View system dashboard (users, stores, ratings statistics).
Apply sorting & filtering on users/stores.



Normal User

Register & login.
View/search stores.
Submit, edit, or delete store ratings.
View average ratings.



Store Owner

Manage their own store profile.
View ratings & feedback from users.
Monitor average rating for their stores.



📊 Store & Rating System

1–5 star rating system.
Stores searchable by name/address.
Filtering & sorting options (backend-driven via query params).
Real-time rating updates reflected in dashboards.


🛠 Tech Stack
Frontend (React.js)

React.js (with modular folder structure).
React Router DOM (createBrowserRouter) for routing.
Context API / Redux for authentication & global state.
Axios for API requests.
TailwindCSS for styling.
Reusable components (forms, tables, modals, rating stars).

Backend (Express.js)

Express.js REST API.
Sequelize ORM with MySQL.
JWT authentication & role-based middleware.
Express-validator / Joi for validations.
Bcrypt for password hashing.

Database (MySQL + Sequelize)

Sequelize models & migrations.
Associations:

User.hasMany(Store)
Store.belongsTo(User)
User.hasMany(Rating)
Store.hasMany(Rating)


Seed data for test users & stores.


🗂 Project Structure
Frontend (React)
src/
├── components/   # Reusable UI components
├── pages/        # Route-based pages (Login, Register, Dashboard, etc.)
├── services/     # API service calls (axios)
├── hooks/        # Custom hooks (auth, validation)
├── context/      # Context API / Redux store
├── utils/        # Helper functions & constants
├── assets/       # Images, icons, styles
└── App.jsx

Backend (Express + Sequelize)
backend/
├── models/       # Sequelize models (User, Store, Rating)
├── migrations/   # Sequelize migrations
├── seeders/      # Initial data
├── routes/       # Express routes (auth, users, stores, ratings)
├── controllers/  # Route controllers
├── middleware/   # Auth & role-based middlewares
├── utils/        # Validation & helpers
└── server.js     # Entry point


📐 Database Schema (ERD)
Entities:

User → (id, name, email, address, password, role)
Store → (id, name, email, address, ownerId)
Rating → (id, ratingValue, userId, storeId)

Relations:

A User can own many Stores.
A Store belongs to a User (owner).
A User can rate many Stores.
A Store can have many Ratings.


⚡ API Endpoints
Auth

POST /auth/register → Register new user
POST /auth/login → Login & set JWT
POST /auth/logout → Logout

Users

GET /users → List all users (admin only, with filters & sorting)
PUT /users/:id → Update user (admin)
DELETE /users/:id → Delete user (admin)

Stores

GET /stores → Get all stores (search, filter, sort)
POST /stores → Add new store (admin/store owner)
PUT /stores/:id → Update store (owner/admin)
DELETE /stores/:id → Delete store (admin)

Ratings

POST /ratings → Add rating (user)
PUT /ratings/:id → Update rating (user)
GET /ratings/store/:storeId → Get all ratings for a store
GET /ratings/user/:userId → Get all ratings by a user


⚙ Setup & Installation
Backend
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Setup environment variables (.env)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=ratemystore
JWT_SECRET=your_jwt_secret

# Run migrations & seeders
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

# Start server
npm run dev

Frontend
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev


🔒 Security Highlights

JWT stored in HTTP-only cookies (prevents XSS token theft).
Passwords hashed with bcrypt before saving in DB.
Role-based middleware protects sensitive routes.
Input validation on both frontend & backend.


🎯 Project Completion Criteria

✅ Fully working role-based authentication.
✅ Admin can manage users & stores with filters/sorting.
✅ Users can search stores & rate them.
✅ Store Owners can view ratings & average scores.
✅ Secure JWT auth + logout.
✅ Consistent validation across frontend & backend.
✅ Clean folder structure (frontend & backend).


📖 Interview Notes
This project demonstrates:

Full-stack development skills (React + Express + Sequelize).
Role-based access control (RBAC) implementation.
Secure authentication with JWT + bcrypt.
Database schema design & ORM best practices.
Clean, modular frontend architecture.
REST API design & integration with React.

