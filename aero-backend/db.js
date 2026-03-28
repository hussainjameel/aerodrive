import mongoose from 'mongoose';
import Minio from 'minio';
import * as dotenv from 'dotenv';
dotenv.config();


const URI = process.env.MONGO_URI?.trim();

export const mongodb = async () => {
  console.log("Initializing MongoDB connection");

  if (!URI) {
    console.error("MONGO_URI is missing. Check your .env file.");
    return;
  }

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });

  mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected");
  });

  try {
    await mongoose.connect(URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("Connection Successful");
  } catch (error) {
    console.error("Failed to connect to MongoDB Atlas.");
    console.error("If using Atlas, whitelist your current IP in Network Access.");
    console.error(error.message);
  }
};

mongodb().catch((error) => {
  console.error("Unexpected MongoDB startup error:", error.message);
});

export const minioClient = new Minio.Client({
    endPoint: 'play.min.io',
    port: 9000,
    useSSL: true,
    accessKey: process.env.MINIO_ACCESS,
    secretKey: process.env.MINIO_SECRET,
  });
