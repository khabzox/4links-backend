import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import urlRoutes from "./routes/urlRoutes.js";
import { clerkMiddleware } from "@clerk/express";

dotenv.config();

const app = express();

/*
  Use Clerk middleware to handle authentication and authorization for Clerk.com
  visit https://clerk.com/docs/quickstarts/express for more information
*/
app.use(clerkMiddleware());

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", urlRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
