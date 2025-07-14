# 💎 Luxury In Taste (LIT) - Integrated E-commerce Platform

## 🌟 Overview

**Luxury In Taste (LIT)** is a full-stack e-commerce platform built with React, Node.js, and Azure cloud services. The platform integrates modern web technologies to deliver a seamless shopping experience focused on luxury and fashion products.

---

## 🚀 Tech Stack

### 🖥️ Frontend
- **React 18.2.0** with **Vite**
- **Material-UI (MUI)** for components
- **Redux Toolkit** for state management
- **React Router** for navigation
- **MSAL** for Microsoft authentication
- **React-Quill** for rich text editing

### 🔧 Backend
- **Node.js** with **Express**
- **MongoDB** with **Mongoose**
- **Azure Functions**
- **Azure Static Web Apps**
- **Azure Cosmos DB**
- **JWT** for authentication
- **Nodemailer** for email services

### 💳 Payment Integration
- **Razorpay** payment gateway

---

## 📁 Project Structure

```
lit-integrated/
├── .github/             # GitHub Actions workflows
├── api/                 # Azure Functions
│   ├── confirm/         # Email confirmation function
│   └── subscribe/       # Newsletter subscription function
├── backend/             # Main backend server
│   ├── controllers/     # Business logic
│   ├── middleware/      # Custom middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   └── schemas/         # Validation schemas
└── frontend/            # React application
    ├── public/          # Static assets
    └── src/
        ├── components/  # React components
        ├── context/     # Context providers
        ├── pages/       # Page components
        ├── redux/       # Redux store
        └── services/    # API services
```

---

## 🛠️ Setup Instructions

### 🔍 Prerequisites

- Node.js (v18 or higher)
- MongoDB
- Azure account
- npm or yarn
- Git

---

### 🔐 Environment Variables

#### 📦 Backend (`.env`)
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

#### ☁️ Azure Functions (`local.settings.json`)
```json
{
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "COSMOS_DB_ENDPOINT": "your_cosmos_db_endpoint",
    "COSMOS_DB_KEY": "your_cosmos_db_key",
    "ACS_CONNECTION_STRING": "your_acs_connection_string",
    "EMAIL_SENDER_ADDRESS": "your_email"
  }
}
```

---

### 📥 Installation

1. **Clone the repository**
```bash
git clone https://github.com/luxuryintaste-lit/lit-integrated.git
cd lit-integrated
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

4. **Install Azure Functions dependencies**
```bash
cd ../api
npm install
```

---

### ▶️ Running the Application

1. **Start the backend server**
```bash
cd backend
npm run dev
```

2. **Start the frontend development server**
```bash
cd ../frontend
npm run dev
```

3. **Start Azure Functions locally**
```bash
cd ../api
npm start
```

---

## 🔑 Features

- User authentication and authorization
- Product catalog with categories
- Shopping cart functionality
- Newsletter subscription
- Order management
- Payment processing
- Admin dashboard
- Rich text content management
- Email notifications
- Responsive design

---

## 🚢 Deployment

The platform uses **GitHub Actions** for CI/CD:

- **Frontend** → Azure Static Web Apps  
- **Backend** → Azure App Service  
- **Azure Functions** → Auto-deploy from GitHub

---

## 📘 API Documentation

### 🔗 Main Endpoints

- `GET /api/users` – User management  
- `GET /api/products` – Product operations  
- `POST /api/orders` – Order processing  
- `POST /api/newsletter` – Newsletter subscriptions  
- `GET /api/articles` – Content management  

> Detailed route and controller logic is available in the `/backend/routes` directory.

---

## 👥 Support

For support, please contact:  
📧 **info@luxuryintaste.com**  
Or open an issue in the repository.

---

## ✍️ README Credits

README maintained by: [Vishisht16](https://github.com/Vishisht16) – vishishtmishra150@gmail.com

---

## 📜 License

© 2025 **Luxury In Taste**. All rights reserved.

This repository and its contents are the exclusive intellectual property of **Luxury In Taste**.

📌 **No part of this codebase may be copied, reproduced, modified, published, uploaded, posted, transmitted, or distributed in any form or by any means without prior written permission from Luxury In Taste.**

Any unauthorized use of the materials may violate copyright laws, trademark laws, and other applicable laws and could result in severe civil and criminal penalties.
