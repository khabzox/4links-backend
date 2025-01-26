import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import express, { Application } from "express";

export const setupMiddleware = (app: Application): void => {
  app.use(clerkMiddleware());
  app.use(cors());
  app.use(express.json());
};
