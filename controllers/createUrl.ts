import { Request, Response } from "express";
import Url from "../models/Url.js";
import shortid from "shortid";

export const createUrl = async (req: Request, res: Response): Promise<void> => {
  const { originalUrl, customShortUrl } = req.body as { originalUrl: string, customShortUrl?: string };
  const shortUrl = customShortUrl || shortid.generate();

  try {
    if (customShortUrl) {
      const existingUrl = await Url.findOne({ shortUrl: customShortUrl });
      if (existingUrl) {
        res.status(400).json({ error: "Custom short URL already exists" });
      }
    }

    const url = new Url({ originalUrl, shortUrl });
    await url.save();
    res.status(201).json(url);
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).json({ error: "Server error" });
  }
};