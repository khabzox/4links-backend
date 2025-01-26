import { Request, Response } from "express";
import Url from "../models/Url";

export const getAllUrls = async (req: Request, res: Response): Promise<void> => {
  try {
    const urls = await Url.find();
    res.json(urls);
  } catch (error) {
    console.error("Error fetching URLs:", error);
    res.status(500).json({ error: "Server error" });
  }
};