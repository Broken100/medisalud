# Project: Medisalud

This document provides a comprehensive overview of the Medisalud project, its structure, and instructions for setup and development.

## Project Overview

Medisalud is a full-stack web application designed for managing medical appointments and services. It consists of three main components:

*   **Backend**: A Node.js and Express.js server that provides a RESTful API for interacting with the application's data. It handles user authentication, data storage, and business logic.
*   **Frontend**: A React application for patients/users to browse doctors, book appointments, and manage their profiles.
*   **Admin**: A separate React application for administrators and doctors to manage appointments, doctor listings, and other administrative tasks.

## Technology Stack

*   **Backend**:
    *   Node.js
    *   Express.js
    *   MongoDB (with Mongoose)
    *   JSON Web Tokens (JWT) for authentication
    *   Cloudinary for image storage
*   **Frontend & Admin**:
    *   React
    *   Vite
    *   React Router
    *   Tailwind CSS
    *   Axios for API communication

## Project Structure

The project is organized into a monorepo structure with three distinct directories:

```
medisalud/
├── admin/         # React application for admin and doctors
├── backend/       # Node.js/Express.js backend server
└── frontend/      # React application for patients/users
```

## Setup and Running the Project

To run the Medisalud application, you need to set up and run each of the three components (backend, frontend, and admin) separately.

### Backend Setup

1.  **Navigate to the backend directory**:
    ```bash
    cd backend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up environment variables**:
    Create a `.env` file in the `backend` directory and add the following variables. Replace the placeholder values with your actual configuration.
    ```
    PORT=4000
    MONGODB_URI=mongodb://localhost:27017
    JWT_SECRET=<YOUR_JWT_SECRET>
    CLOUDINARY_CLOUD_NAME=<YOUR_CLOUDINARY_CLOUD_NAME>
    CLOUDINARY_API_KEY=<YOUR_CLOUDINARY_API_KEY>
    CLOUDINARY_API_SECRET=<YOUR_CLOUDINARY_API_SECRET>
    ```

4.  **Start the server**:
    For development with automatic reloading:
    ```bash
    npm run server
    ```
    To start the server in production:
    ```bash
    npm start
    ```
    The backend server will be running at `http://localhost:4000`.

### Frontend Setup

1.  **Navigate to the frontend directory**:
    ```bash
    cd frontend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npm run dev
    ```
    The frontend application will be running at `http://localhost:5173` (or another port if 5173 is in use).

### Admin Setup

1.  **Navigate to the admin directory**:
    ```bash
    cd admin
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npm run dev
    ```
    The admin application will be running at a different port (e.g., `http://localhost:5174`).

## API Endpoints

The backend exposes the following API endpoints:

*   `/api/admin`: Routes for administrative tasks.
*   `/api/doctor`: Routes for doctor-specific actions.
*   `/api/user`: Routes for user/patient actions.

## Development Conventions

*   **Code Style**: The project uses ESLint to enforce a consistent code style. It's recommended to integrate ESLint into your code editor for real-time feedback.
*   **Commits**: Follow conventional commit message standards.
*   **Dependencies**: Use `npm` for package management.

This document should serve as a good starting point for understanding and working with the Medisalud project. For more detailed information, please refer to the source code within each respective directory.
