import mongoose from "mongoose";

export default function Dbconnection() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connection established"))
    .catch((err) => console.error("MongoDB connection error:", err));
}
