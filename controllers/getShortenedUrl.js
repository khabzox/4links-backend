import Url from "../models/Url.js";

export const getShortenedUrl = async (req, res) => {
  const { originalUrl } = req.query;

  try {
    const url = await Url.findOne({ originalUrl });
    if (url) {
      res.json(url);
    } else {
      res.status(404).json({ error: "URL not found" });
    }
  } catch (error) {
    console.error("Error fetching shortened URL:", error);
    res.status(500).json({ error: "Server error" });
  }
};