import { Request, Response } from "express";
import Url from "../models/Url.js";
import bcrypt from "bcrypt";

export const redirectUrl = async (req: Request, res: Response): Promise<void> => {
  const { shortUrl } = req.params;  // Extract shortUrl from the URL parameter
  const { password } = req.query;   // Extract password from the query parameters (instead of the body)

  try {
    const url = await Url.findOne({ shortUrl });  // Find the URL document by short URL

    if (!url) {
      res.status(404).json({ error: "URL not found" });  // If the short URL doesn't exist
      return;
    }

    // Check if the URL has a password set
    if (url.password) {
      if (!password) {
        res.status(401).json({ error: "Password is required to access this URL" });  // No password provided
        return;
      }

      // Compare the provided password with the hashed password stored in the database
      const isMatch = await bcrypt.compare(password as string, url.password);
      if (!isMatch) {
        res.status(401).json({ error: "Incorrect password" });  // Password doesn't match
        return;
      }
    }

    // Redirect to the original URL if password matches or no password is set
    res.redirect(url.originalUrl);
  } catch (error) {
    console.error("Error redirecting URL:", error);
    res.status(500).json({ error: "Server error" });  // Handle server errors
  }
};
