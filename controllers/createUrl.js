import Url from "../models/Url.js";
import shortid from "shortid";

export const createUrl = async (req, res) => {
  const { originalUrl } = req.body;
  const shortUrl = shortid.generate();

  try {
    const url = new Url({ originalUrl, shortUrl });
    await url.save();
    res.status(201).json(url);
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).json({ error: "Server error" });
  }
};