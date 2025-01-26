import { Request, Response, NextFunction } from "express";
import Url from "../../models/Url.js";

export const handleRedirect = async (req: Request, res: Response): Promise<void> => {
  const host = req.get("host"); 
  const shortUrl = req.params.shortUrl;

  try {
    const url = await Url.findOne({ shortUrl, domain: host });
    if (!url) {
      res.status(404).json({ error: "Short URL not found" });
      return;
    }
    res.redirect(url.originalUrl);
  } catch (error) {
    console.error("Error handling redirect:", error);
    res.status(500).json({ error: "Server error" });
  }
};
