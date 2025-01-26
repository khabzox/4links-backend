import Url from "../models/Url.js";

export const readUrl = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const url = await Url.findOne({ shortUrl });
    if (url) {
      res.json(url);
    } else {
      res.status(404).json({ error: "URL not found" });
    }
  } catch (error) {
    console.error("Error reading URL:", error);
    res.status(500).json({ error: "Server error" });
  }
};