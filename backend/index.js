import express, { urlencoded } from 'express';
import router from './routes/router.js';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api', router);

// MongoDB Connection
if (!process.env.MONGO_URI) {
  console.error('Error: MONGO_URI is not defined in .env');
  process.exit(1); // Exit the application if no connection string is provided
}

mongoose
  .connect(process.env.MONGO_URI) // No need for useNewUrlParser or useUnifiedTopology
  .then(() => console.log('MongoDB connection established'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Error-Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
