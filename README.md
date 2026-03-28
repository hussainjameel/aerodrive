# AeroDrive - File Management System

AeroDrive allows users to sign up, log in, and manage files through a familiar desktop-style interface with a powerful Syncfusion-powered File Manager.

## ✨ Features

- 🔐 **Secure Authentication** – Signup and Login using JWT
- 🖥️ **Desktop-like UI** – Draggable windows, taskbar, icons, and interactive desktop environment
- 📁 **Advanced File Manager** – Full-featured file upload, download, rename, delete using Syncfusion EJ2
- 📅 **Built-in Mini Apps** – Calculator, Calendar, Settings, and more
- ☁️ **Cloud Storage** – File storage powered by MinIO
- ⚡ **Fast & Smooth Frontend** – Built with React + Vite

## 🏗️ Architecture

Frontend (React + Vite)
↓
Backend API (Express.js + JWT)
↓
MongoDB Atlas (User Management)
Syncfusion File Manager UI
↓
File Server (Separate Node Process)
↓
MinIO Object Storage (Files)

## 🧰 Tech Stack

### Frontend
- React 18 + Vite
- Syncfusion EJ2 React File Manager
- Axios, Zustand, Framer Motion
- Bootstrap + Custom CSS

### Backend
- Express.js
- JWT Authentication
- Mongoose + MongoDB
- Multer (for file handling)

### Database & Storage
- MongoDB Atlas (Free Tier)
- MinIO (Object Storage)

### Deployment
- Render (Frontend Static Site + 2 Web Services)

## 🚀 Live Demo

- **Frontend**: https://aerodrive-frontend.onrender.com
- **Backend API**: https://aerodrive-backend.onrender.com
- **File Server**: https://aerodrive-fileserver.onrender.com

> ⚠️ **Note**: Services are hosted on Render’s free tier. Expect a 10–30 second cold start delay on first visit.

## 🛠️ Local Installation & Setup

### Prerequisites
- Node.js (recommended: use `.nvmrc`)
- MongoDB Atlas account (or local MongoDB)
- MinIO server (for file storage)

### 1. Clone the Repository

```
git clone https://github.com/yourusername/aerodrive.git
cd aerodrive
```

Backend Setup
```
cd backend
npm install
npm start
```

Frontend Setup
```
cd frontend
npm install
npm run dev
```

📦 Deployment
Deployed using Render with three services:

Static Site: Frontend (React Vite)
Web Service: Main Backend (Express API)
Web Service: Syncfusion File Server

Environment Variables:
```
Backend:
envMONGO_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret
MINIO_ACCESS=your_minio_access_key
MINIO_SECRET=your_minio_secret_key
Frontend:
envVITE_API_URL=https://.....
VITE_FILE_MANAGER_URL=https://aerodrive....
```

📊 Project Highlights

Successfully integrated Syncfusion File Manager with a separate Node file server
Implemented multi-service deployment on Render
Handled CORS, environment variables, and cold starts
Built a responsive desktop-style UI with smooth interactions


