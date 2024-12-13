import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import connectDB from './configuration/dbConfig.js';
import blogRoutes from './routes/blogRoutes.js';
import authRoutes from './routes/authRoutes.js';
import User from './models/User.js';

dotenv.config();

// Get the absolute path to the root folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const allowedOrigins = [
  'http://localhost:3000', // Local development
  'https://fullstack-blogweb.onrender.com', // Render deployment
];

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(helmet());

// Rate Limiting Setup
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Serve static files from the frontend/build directory
if (process.env.NODE_ENV === 'development') {
  console.log('Serving static files from:', path.join(__dirname, '../frontend/build'));
  app.use(express.static(path.join(__dirname, '../frontend/build')));
}

// Function to create an admin user
const createAdminUser = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (!adminExists) {
      const admin = new User({
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin',
      });
      await admin.save();
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }
  } catch (err) {
    console.error('Error during admin user creation:', err.message);
  }
};

// Connect to DB, create Admin user, and set up routes
connectDB()
  .then(async () => {
    await createAdminUser();

    // API Routes
    app.use('/api/blogs', blogRoutes);
    app.use('/api/auth', authRoutes);

    // Welcome Route (only in development mode)
    if (process.env.NODE_ENV === 'development') {
      app.get('/', (req, res) => {
        res.json({
          message: 'Welcome to the Blog API',
          endpoints: {
            blogs: '/api/blogs',
            auth: '/api/auth',
          },
        });
      });
    }

    // Serve Frontend in Production
    if (process.env.NODE_ENV === 'production') {
      const frontendBuildPath = path.join(__dirname, '../frontend/build');
      app.use(express.static(frontendBuildPath));

      // Redirect all unknown routes to the frontend's index.html
      app.get('*', (req, res) => {
        res.sendFile(path.join(frontendBuildPath, 'index.html'));
      });
    }

    // Start Server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error during server startup:', err.message);
  });
