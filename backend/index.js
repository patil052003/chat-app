import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from 'path';
import router from "./route/Route.js";
import Route_message from "./route/Route_message.js"; // Adjust the path as needed
import { app, server } from "./socketIO/Server.js";
import { Server } from "socket.io";

dotenv.config();

// const app = express();

const PORT = process.env.PORT || 5002;
const URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:4001',
  credentials: true,
}));

connectDB();

app.get("/", (req, res) => {
  res.send("Hello Patil!");
});

// Use the user routes
app.use("/api/user", router);
app.use("/api/message", Route_message);

if (process.env.NODE_ENV === 'production') {
  const dirPath = path.resolve();
  app.use(express.static("./chat-app/dist"));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(dirPath, './chat-app/dist', 'index.html'));
  });
}

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
