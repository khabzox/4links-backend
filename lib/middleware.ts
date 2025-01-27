/**
 * Sets up middleware for the given Express application.
 *
 * This function configures the following middleware:
 * - `clerkMiddleware`: Middleware for authentication using Clerk.
 * - `cors`: Middleware to enable Cross-Origin Resource Sharing.
 * - `express.json()`: Middleware to parse incoming JSON requests.
 *
 * @param app - The Express application instance to configure middleware for.
 */


import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import express, { Application } from "express";

export const setupMiddleware = (app: Application): void => {
  app.use(clerkMiddleware());
  app.use(cors());
  app.use(express.json());
};
