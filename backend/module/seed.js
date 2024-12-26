import mongoose from "mongoose";
import dotenv from "dotenv";
import data from "../utils/Data.js";
import Item from "../schemas/items.js";
import Dbconnection from "../utils/mongodbcon.js"; // Import default function

// Load environment variables
dotenv.config();

// Seed Database
const seedDb = async () => {
  try {
    // Wait for database connection
    await Dbconnection(); // FIX: Added await

    // Clear existing data
    await Item.deleteMany({});
    console.log("Existing items deleted.");

    // Insert new data
    await Item.insertMany(data.products);
    console.log("Items added successfully");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    // Close connection
    mongoose.connection.close();
  }
};

// Execute seeding
seedDb();
