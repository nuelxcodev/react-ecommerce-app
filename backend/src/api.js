import express from "express";
import router from "../routes/router.js";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import Dbconnection from "../utils/mongodbcon.js";
import serverless from "serverless-http"; // Required for Netlify Functions

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" })); // Update this with your frontend URL
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/.netlify/functions/api", router);

// MongoDB Connection
Dbconnection();

// Error-Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Export as a serverless function for Netlify
export const handler = serverless(app);
