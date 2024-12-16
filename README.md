# FullStack Blog Web (MERN Stack)

This is a **FullStack Blog Web** application built using the **MERN Stack** (MongoDB, Express, React, Node.js). It is designed to allow **admin** users to authenticate and manage blog posts. The admin can create, read, update, and delete posts through a secure and modern interface.

## Features

- **Admin Authentication**: Only admin users can sign up, log in, and manage posts, secured with JWT (JSON Web Tokens).
- **Blog Post Management**: Admin users can create, update, delete, and view blog posts, with full CRUD functionality.
- **Responsive UI**: Built with React and CSS, ensuring a responsive, clean design on all devices.
- **Image Carousel**: A dynamic image slider is implemented with **Swiper.js** to display featured posts or images.
- **Secure Backend**: The API is built with **Node.js** and **Express.js**, storing data in **MongoDB**.
- **Admin Dashboard**: A simple and intuitive dashboard to manage all blog posts efficiently.

## Technologies Used

### Frontend:
- **React.js**: For building the user interface.
- **React Router**: For navigation and routing between pages.
- **Axios**: For making HTTP requests to interact with the backend API.
- **Swiper.js**: For creating the image carousel slider.
- **CSS**: For styling the application with custom, responsive designs.

### Backend:
- **Node.js**: JavaScript runtime for the backend server.
- **Express.js**: Framework for building the API.
- **MongoDB**: NoSQL database for storing blog posts and user data.
- **JWT (JSON Web Tokens)**: Used for admin authentication to secure the API routes.

### Development Tools:
- **npm**: Package manager for JavaScript dependencies.
- **Git**: Version control to track changes and collaborate.
- **Postman**: For testing API endpoints during development.

## Installation Guide

### Prerequisites
- **Node.js** (v14 or higher) installed.
- **MongoDB** (either locally or via MongoDB Atlas).

### Steps to Run the Application

1. **Clone the Repository**:
   First, clone the repository to your local machine:

   ```bash
   git clone https://github.com/Gulverda/FullStack_BlogWeb.git
   cd FullStack_BlogWeb

2. **Set Up the Backend**:
   Navigate to the backend directory and install the required dependencies:

   ```bash
   cd backend
   npm install

3. **ENV**
   Create a .env file in the backend directory to store your environment variables (MongoDB URI and JWT secret)
   ```bash
   MONGODB_URI=mongodb://localhost:example/exampleDB
   JWT_SECRET=your_jwt_secret_key


3. **Install the frontend dependencies:**
   ```bash
   cd ../frontend
   npm install

4. **Run the backend and frontend servers**
   For the backend (API server):
   ```bash
   cd backend
   npm run dev
   ```
   For the frontend (React app):
   ```bash
   cd frontend
   npm start

