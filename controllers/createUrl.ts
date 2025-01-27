import { Request, Response } from "express";
import Url from "../models/Url.js";
import shortid from "shortid";
import { checkUrlSafety } from "../utils/urlSafety.js"; 

/**
 * Creates a shortened URL based on the provided original URL and an optional custom short URL.
 * 
 * @param req - The request object containing the original URL and optional custom short URL in the body.
 * @param res - The response object used to send back the appropriate HTTP response.
 * 
 * @returns A promise that resolves to void.
 * 
 * The function performs the following steps:
 * 1. Checks if the original URL is provided. If not, responds with a 400 status and an error message.
 * 2. Generates a short URL using a custom short URL if provided, or generates a new one.
 * 3. Checks the safety of the original URL. If the URL is flagged as unsafe, responds with a 400 status and an error message.
 * 4. Validates the custom short URL (if provided) to ensure it does not already exist. If it does, responds with a 400 status and an error message.
 * 5. Saves the original URL and the generated short URL to the database.
 * 6. Responds with a 201 status and the saved URL object if successful.
 * 7. Catches and logs any errors, responding with a 500 status and a server error message.
 */

export const createUrl = async (req: Request, res: Response): Promise<void> => {
  const { originalUrl, customShortUrl } = req.body as { originalUrl: string, customShortUrl?: string };

  if (!originalUrl) {
    res.status(400).json({ error: "Original URL is required" });
    return;
  }

  const shortUrl = customShortUrl || shortid.generate();

  try {
    // Step 1: Check URL safety
    const isSafe = await checkUrlSafety(originalUrl);
    if (!isSafe) {
      res.status(400).json({ error: "The provided URL is flagged as malicious or unsafe" });
      return;
    }

    // Step 2: Validate custom short URL (if provided)
    if (customShortUrl) {
      const existingUrl = await Url.findOne({ shortUrl: customShortUrl });
      if (existingUrl) {
        res.status(400).json({ error: "Custom short URL already exists" });
        return;
      }
    }

    // Step 3: Save the URL to the database
    const url = new Url({ originalUrl, shortUrl });
    await url.save();

    res.status(201).json(url);
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).json({ error: "Server error" });
  }
};
