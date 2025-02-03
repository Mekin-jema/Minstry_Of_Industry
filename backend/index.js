import express from "express";
import cors from "cors";
import uploadFile from "./routes/uploadFile.route.js";
import CSVFileRouter from "./routes/readCSVFile.routes.js";
import authRouter from "./routes/auth.route.js";
import db from './db/connect.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors({
  origin: 'http://localhost:5173', // Allow only this frontend
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type',
}));
// Use the uploadFile route
app.use("/api", uploadFile); // Prefix all routes with '/api'
app.use("/api", CSVFileRouter);
app.use("/api", authRouter);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  db();
});