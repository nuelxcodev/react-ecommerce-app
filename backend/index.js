import express, { urlencoded } from "express";
import router from "./routes/router.js";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import Dbconnection from "./utils/mongodbcon.js";
import { sendOTP } from "./controller/otpcontroller.js";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080; // Allow flexibility in port assignment

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api", router);

// MongoDB Connectionn



// Error-Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start Server
app.listen(PORT, () => {
  Dbconnection();
  console.log(`Listening on port ${PORT}`);
});
