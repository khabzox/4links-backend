import { Request, Response } from "express";
import Url from "../models/Url.js";

export const updateUrl = async (req: Request, res: Response): Promise<void> => {
  const { shortUrl } = req.params;
  const { originalUrl } = req.body;

  try {
    const url = await Url.findOneAndUpdate({ shortUrl }, { originalUrl }, { new: true });
    if (url) {
      res.json(url);
    } else {
      res.status(404).json({ error: "URL not found" });
    }
  } catch (error) {
    console.error("Error updating URL:", error);
    res.status(500).json({ error: "Server error" });
  }
};