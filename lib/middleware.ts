import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import express from "express";

export const setupMiddleware = (app) => {
  app.use(clerkMiddleware());
  app.use(cors());
  app.use(express.json());
};