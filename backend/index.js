const express = require("express");
const router = require("./routes/router.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const Dbconnection = require("./utils/mongodbcon.js");


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
