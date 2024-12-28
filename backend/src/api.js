import express from "express";
import router from "../functions/routes/router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import Dbconnection from "../functions/utils/mongodbcon.js";
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
