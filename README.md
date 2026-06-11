# EmPower - AI Powered Task Management System

EmPower is a full-stack task management application developed as part of the Hairdrama technical assignment. The application enables users to authenticate using Google OAuth, manage tasks efficiently, assign tasks to team members, track task status, and receive email notifications for important task-related events.

## Live Demo

* Frontend: https://hairdrama-task-manager-virid.vercel.app/
* Backend API: https://hairdrama-task-manager-production-ecd5.up.railway.app/
* GitHub Repository: https://github.com/sakshamjai/hairdrama-task-manager.git

---

## Features

### Authentication

* Google OAuth 2.0 authentication using NextAuth
* Secure session management
* Automatic user registration on first login
* Protected dashboard access

### Task Management

* Create new tasks
* Assign tasks to users
* View all assigned tasks
* Track task status
* Mark tasks as completed
* Real-time task updates

### User Management

* Automatic user synchronization with the database
* View available users for task assignment
* Centralized user management

### Email Notifications

* Task assignment notifications
* Task completion notifications
* Integrated email service using Flask-Mail

### Deployment

* Frontend deployed on Vercel
* Backend deployed on Railway
* Database hosted on Supabase

---

## Tech Stack

### Frontend

* Next.js 15 (App Router)
* TypeScript
* Tailwind CSS
* NextAuth.js
* Axios
* React Hooks

### Backend

* Flask
* Flask-CORS
* Flask-Mail
* Gunicorn

### Database

* Supabase (PostgreSQL)

### Deployment Platforms

* Vercel (Frontend)
* Railway (Backend)

---

## System Architecture

Frontend (Next.js)

↓

Authentication (NextAuth + Google OAuth)

↓

Flask REST API

↓

Supabase Database

↓

Email Notification Service

---

## Database Schema

### Users Table

| Field | Type | Description |
| ----- | ---- | ----------- |
| id    | UUID | Primary Key |
| email | Text | User Email  |
| name  | Text | User Name   |

### Tasks Table

| Field          | Type | Description         |
| -------------- | ---- | ------------------- |
| id             | UUID | Primary Key         |
| title          | Text | Task Title          |
| description    | Text | Task Description    |
| assigned_email | Text | Assigned User Email |
| creator_email  | Text | Task Creator Email  |
| status         | Text | Pending / Completed |

---

## API Endpoints

### Authentication

POST `/auth/google-user`

Registers Google authenticated users in Supabase.

---

### Users

GET `/users`

Returns all registered users.

---

### Tasks

GET `/tasks`

Returns all tasks.

POST `/tasks`

Creates a new task.

PATCH `/tasks/<task_id>/complete`

Marks a task as completed.

---

## Local Setup Instructions

### Clone Repository

```bash
git clone https://github.com/sakshamjai/hairdrama-task-manager.git
cd hairdrama-task-manager
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

---

## Backend Setup

Create virtual environment:

```bash
python -m venv venv
```

Activate virtual environment:

Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run Flask application:

```bash
python app.py
```

Backend runs on:

```text
http://localhost:5000
```

---

## Environment Variables

### Frontend (.env.local)

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
NEXT_PUBLIC_BACKEND_URL=
```

### Backend (.env)

```env
SUPABASE_URL=
SUPABASE_KEY=
EMAIL_USER=
EMAIL_PASSWORD=
FRONTEND_URL=
```

---

## Challenges Faced

* Configuring Google OAuth using NextAuth
* Deploying a monorepo architecture across Vercel and Railway
* Managing environment variables securely across platforms
* Handling CORS between frontend and backend services
* Integrating Supabase with Flask APIs
* Debugging deployment and runtime issues in production

---

## Future Enhancements

* Role-based access control
* Task due dates and reminders
* Task prioritization
* AI-powered task generation and recommendations
* Team collaboration features
* Activity logs and analytics

---

## Author

Saksham Jain

Developed as part of the Hairdrama Technical Assignment.
