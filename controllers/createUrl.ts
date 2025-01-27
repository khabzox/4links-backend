/**
 * Creates a short URL from the provided original URL and optional custom short URL and password.
 * 
 * @param {Request} req - The request object containing the original URL, custom short URL, and password.
 * @param {Response} res - The response object used to send back the created URL or an error message.
 * @returns {Promise<void>} - A promise that resolves to void.
 * 
 * @todo Add feature to track the number of times the short URL is accessed.
 */

import { Request, Response } from "express"
import bcrypt from "bcrypt";
import shortid from "shortid";
import Url from "../models/Url.js";

export const createUrl = async (req: Request, res: Response): Promise<void> => {
  const { originalUrl, customShortUrl, password } = req.body;

  // Generate a short URL or use the custom one if provided
  const shortUrl = customShortUrl || shortid.generate();

  try {
    // Hash the password (if provided)
    let hashedPassword = null;
    if (password) {
      const salt = await bcrypt.genSalt(10);  // Create salt for hashing
      hashedPassword = await bcrypt.hash(password, salt);  // Hash the password
    }

    // Create the URL document to be saved
    const url = new Url({
      originalUrl,
      shortUrl,
      password: hashedPassword,  // Store the hashed password if available
    });

    await url.save(); // Save to the database
    res.status(201).json(url);  // Respond with the created URL
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).json({ error: "Server error" });  // Handle errors
  }
};
