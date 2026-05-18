# 🚀 Smart Lead Management System

A Full-Stack **MERN (MongoDB, Express, React, Node.js)** application designed to track, manage, and optimize business leads efficiently. Built with **TypeScript** for type safety, **Tailwind CSS** for modern UI, and completely deployed on the cloud.

---

## 🌐 Live Demo & Repository
* **Live Website:** https://lead-project-management-1.onrender.com
* **Backend API:** https://lead-project-management.onrender.com/

---

## ✨ Features
* **Secure Authentication:** JWT-based signup/login with password hashing (bcrypt).
* **Lead Dashboard:** Comprehensive dashboard to view, sort, filter, and search leads.
* **CRUD Operations:** Full capability to Create, Read, Update, and Delete leads seamlessly.
* **Role-Based Access:** Protected routes and actions (e.g., Delete restricted based on roles).
* **Responsive UI:** Fully optimized for Mobile, Tablet, and Desktop using Tailwind CSS.

---

## 🛠️ Tech Stack

### Frontend
* **React.js** (with Vite)
* **TypeScript**
* **Tailwind CSS**
* **Axios** (with centralized interceptors for automatic JWT token handling)

### Backend
* **Node.js** & **Express.js**
* **TypeScript**
* **Mongoose / MongoDB Atlas** (Cloud Database)
* **JSON Web Tokens (JWT)** & **Bcrypt.js**

---

## 📁 Project Structure

```text
lead-management-system/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── models/           # MongoDB schemas
│   │   ├── routes/           # Express API endpoints
│   │   └── server.ts         # Main entry point & DB connection
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/       # Reusable UI components
    │   ├── pages/            # Dashboard, Login, Signup pages
    │   ├── services/         # Axios API setup (`api.ts`)
    │   └── App.tsx           # Application routing
    └── package.json

---

## ⚙️ Local Setup Instructions

Follow these structured steps to get the development environment running locally:

### 1. Clone the Repository
```bash
git clone (https://github.com/Princedagar6527/Lead_project_management.git)
cd Lead_project_management

backend/
├── 🛠️ Install Dependencies : npm install
├── 📝 Configure Environment : Create .env file
└── 🚀 Run Server            : npm run dev

1.Navigate to the backend directory:
cd backend
2.Install all required packages:
npm install
3.Configure Environment Variables:
Create a .env file inside the backend/ root folder and add the following keys:
PORT=5000
MONGO_URI=your_mongodb_atlas_cloud_connection_string
JWT_SECRET=your_super_secret_jwt_key

4.Start the Express local server:
npm run dev

frontend/
├── 🛠️ Install Dependencies : npm install
└── 🚀 Run Client            : npm run dev

1.Open a new terminal window and navigate to the frontend directory:
cd frontend

2.Install all required packages:
npm install

3.Start the Vite local development server:
npm run dev

Deployment Details
🌐 Infrastructure Deployment
├── 🖥️ Frontend Backend Sync : Linked via Axios centralized VITE_API_URL
├── 📦 Backend Environment   : Hosted on Render (Web Service) with Injected Env
├── 🌐 Frontend Build        : Hosted on Render (Static Site) using 'dist' folder
└── 🗄️ Database Layer        : Globally hosted on MongoDB Atlas Cloud Cluster
