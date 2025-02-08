# Event Management Platform

A full-stack event management platform where users can create, manage, and view events. The platform includes user authentication, event creation and management tools, and real-time updates for attendees.

## Features

### Frontend
1. **User Authentication**:
    - Register and log in.
    - Guest login for limited access.
2. **Event Dashboard**:
    - Display upcoming and past events.
    - Filter events by categories and dates.
3. **Event Creation**:
    - Form to create events with fields like name, description, date/time, location, and image.
4. **Real-Time Attendee List**:
    - Show the number of attendees for each event in real-time.
5. **Responsive Design**:
    - Works seamlessly on all devices.

### Backend
1. **Authentication API**:
    - JWT-based secure authentication.
2. **Event Management API**:
    - CRUD operations for events with ownership restrictions.
3. **Real-Time Updates**:
    - WebSockets for real-time attendee updates.
4. **Database**:
    - MongoDB for storing user and event data.

## Technologies Used

### Frontend
- **React.js**: Frontend framework.
- **Axios**: HTTP client for API requests.
- **Socket.IO Client**: Real-time communication with the backend.
- **Tailwind CSS**: Styling and responsive design.

### Backend
- **Node.js**: Runtime environment.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: Database for storing user and event data.
- **Socket.IO**: Real-time communication with the frontend.
- **JWT**: JSON Web Tokens for authentication.
- **Cloudinary**: Image hosting for event banners.

### Deployment
- **Frontend Hosting**: Vercel or Netlify.
- **Backend Hosting**: Render or Railway.app.
- **Database**: MongoDB Atlas (Free Tier).

## Setup Instructions

### Prerequisites
1. **Node.js**: Install from [https://nodejs.org/](https://nodejs.org/).
2. **MongoDB Atlas**: Create a free account at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).
3. **Cloudinary**: Create a free account at [https://cloudinary.com/](https://cloudinary.com/).

### Backend Setup
1. Navigate to the `backend` folder:
    ```bash
    cd backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the backend folder and add the following:
    ```env
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/eventdb?retryWrites=true&w=majority
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```
4. Start the backend server:
    ```bash
    node server.js
    ```

### Frontend Setup
1. Navigate to the `frontend` folder:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the frontend development server:
    ```bash
    npm start
    ```

## API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in an existing user.
- `POST /api/auth/guest-login`: Log in as a guest.

### Events
- `GET /api/events`: Get all events.
- `POST /api/events`: Create a new event.
- `GET /api/events/:id`: Get a single event by ID.
- `PUT /api/events/:id`: Update an event.
- `DELETE /api/events/:id`: Delete an event.
- `POST /api/events/:id/attend`: Add an attendee to an event.
