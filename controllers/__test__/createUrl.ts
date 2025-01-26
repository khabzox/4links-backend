import { Request, Response } from "express";
import Url from "../../models/Url.js";
import shortid from "shortid";

export const createUrl = async (req: Request, res: Response): Promise<void> => {
  const { originalUrl, customShortUrl, domain } = req.body as {
    originalUrl: string;
    customShortUrl?: string;
    domain?: string;
  };

  if (!originalUrl) {
    res.status(400).json({ error: "Original URL is required" });
  }

  try {
    // Check and validate custom short URL
    let shortUrl = customShortUrl || shortid.generate();

    if (customShortUrl) {
      const isValidCustom = /^[a-zA-Z0-9-_]+$/.test(customShortUrl);
      if (!isValidCustom) {
        res.status(400).json({ error: "Invalid custom short URL" });
      }

      const existing = await Url.findOne({ shortUrl, domain });
      if (existing) {
        res.status(400).json({ error: "Custom short URL already exists on this domain" });
      }
    }

    // Prepend domain to the short URL if provided
    if (domain) {
      shortUrl = `${domain}/${shortUrl}`;
    }

    // Create and save the URL
    const url = new Url({ originalUrl, shortUrl, domain });
    await url.save();

    res.status(201).json(url);
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).json({ error: "Server error" });
  }
};
