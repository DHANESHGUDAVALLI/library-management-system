# 📚 AI-Powered Library Management System

> A full-stack digital library platform built with React, Flask, PostgreSQL, and Gemini AI, combining secure authentication, book discovery, borrowing workflows, favorites, dashboards, and AI-assisted functionality.

[![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)](https://react.dev/)
[![Flask](https://img.shields.io/badge/Backend-Flask-000000?logo=flask)](https://flask.palletsprojects.com/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169E1?logo=postgresql)](https://www.postgresql.org/)

## 📌 Overview

The **AI-Powered Library Management System** is a full-stack web application designed to modernize library operations through a responsive digital experience.

The system combines a React frontend with a Flask backend and PostgreSQL database, while integrating Gemini AI capabilities. It provides authenticated users with book search, favorites, borrowing functionality, profile management, and dashboard analytics.

## 🎯 Problem Statement

Traditional library systems can rely on manual records, disconnected workflows, and limited visibility into borrowing activity.

A modern library platform should provide:

- Centralized book information
- Fast search and discovery
- Secure user accounts
- Digital borrowing workflows
- Personalized features
- Analytics and dashboards
- A responsive user experience

This project brings these capabilities together into one full-stack application.

## ✨ Key Features

### 🔐 Authentication

- JWT-based authentication
- Secure user registration and login
- Protected application workflows
- Profile management

### 📖 Book Discovery

- Book search
- Book information
- Favorites
- Digital browsing experience

### 📚 Borrowing

- Borrowing workflow
- User-specific borrowing information
- Library activity tracking

### 📊 Dashboard

- Analytics
- User activity
- Library insights

### 🤖 AI Integration

- Gemini AI integration
- AI-assisted library functionality
- Extensible foundation for intelligent recommendations

### 📱 Modern UI

- Responsive frontend
- Component-based React architecture
- User-focused navigation

## 🏗️ Architecture

```text
┌──────────────────────────┐
│      React Frontend      │
│  UI + State + API Calls  │
└────────────┬─────────────┘
             │ HTTP / REST
             ↓
┌──────────────────────────┐
│      Flask Backend       │
│ Routes + Business Logic  │
└────────────┬─────────────┘
             │
       ┌─────┴─────┐
       ↓           ↓
┌────────────┐ ┌────────────┐
│ PostgreSQL │ │  Gemini AI │
│  Database  │ │ Integration│
└────────────┘ └────────────┘
```

## 🔄 Core Workflow

```text
User
 ↓
Login / Register
 ↓
Browse or Search Books
 ↓
View Book Information
 ↓
Favorite / Borrow
 ↓
Backend Validates Request
 ↓
PostgreSQL Stores Data
 ↓
Dashboard Reflects Activity
```

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Backend | Flask |
| Database | PostgreSQL |
| AI | Gemini AI |
| Authentication | JWT |
| API | REST-style backend communication |
| UI | Responsive web interface |

## 📂 Project Structure

```text
library-management-system/
├── backend/
└── frontend/
```

The repository is organized into separate frontend and backend applications to keep presentation, API logic, and data operations modular.

## ⚙️ Installation

### 1. Clone

```bash
git clone https://github.com/DHANESHGUDAVALLI/library-management-system.git
cd library-management-system
```

### 2. Backend

```bash
cd backend
```

Create and activate a Python virtual environment, then install the backend dependencies according to the project's dependency file.

Configure PostgreSQL connection settings and the required AI credentials through environment variables.

Start the Flask backend using the project's configured entry point.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the local development URL shown by the frontend tooling.

## 🔑 Environment Configuration

Keep secrets outside source control.

Typical configuration may include:

```env
DATABASE_URL=your_postgresql_connection
JWT_SECRET=your_secret
GEMINI_API_KEY=your_api_key
```

Use the exact variable names expected by the current backend configuration.

## 🌍 Real-World Applications

- University libraries
- College libraries
- School libraries
- Community libraries
- Corporate knowledge centers
- Digital resource management
- Personalized book discovery platforms

## 🔐 Security Considerations

For production deployment:

- Store secrets in environment variables or a secret manager.
- Use HTTPS.
- Apply strong JWT/session policies.
- Validate and sanitize user input.
- Apply database access controls.
- Implement rate limiting where appropriate.
- Avoid exposing sensitive user information.
- Maintain audit logs for important administrative operations.

## 🚀 Future Enhancements

- Role-based admin and librarian dashboards
- Book inventory management
- Due-date and overdue notifications
- Fine calculation
- QR/barcode-based book checkout
- Email notifications
- Advanced recommendation engine
- AI-powered book discovery
- Personalized reading suggestions
- Book availability prediction
- Cloud deployment
- Automated testing and CI/CD
- Advanced analytics

## 🧪 Testing & Quality

A production-ready version can be strengthened with:

- Backend unit tests
- API integration tests
- Frontend component tests
- Authentication tests
- Database migration strategy
- CI/CD workflows
- Error monitoring
- Performance testing

## 🔗 Repository

[View Library Management System on GitHub](https://github.com/DHANESHGUDAVALLI/library-management-system)

## 👨‍💻 Author

**Dhanesh Gudavalli**

If this project is useful, consider giving the repository a ⭐.
