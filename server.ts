/**
 * @file server.ts
 * @description This file sets up and starts the Express server.
 * It uses Clerk middleware for authentication and authorization, connects to MongoDB,
 * and sets up necessary middleware and routes.
 *
 * @module server
 *
 * @requires express
 * @requires cors
 * @requires dotenv
 * @requires ./lib/db.js
 * @requires ./routes/urlRoutes.js
 * @requires @clerk/express
 *
 * @function clerkMiddleware - Middleware to handle authentication and authorization for Clerk.com
 * @function connectDB - Function to connect to MongoDB
 *
 * @constant {express.Application} app - The Express application instance
 *
 * @constant {number} PORT - The port number on which the server listens (default: 5000)
 *
 * @see {@link https://clerk.com/docs/quickstarts/express Clerk Documentation}
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import urlRoutes from "./routes/urlRoutes.js";
import { clerkMiddleware } from "@clerk/express";

dotenv.config();

const app = express();

// Use Clerk middleware to handle authentication and authorization for Clerk.com
app.use(clerkMiddleware());

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api", urlRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
