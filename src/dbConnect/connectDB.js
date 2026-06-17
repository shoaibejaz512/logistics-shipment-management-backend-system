import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

console.log(process.env.MONGODB_URI);

export const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // stop server if DB fails
  }
};
