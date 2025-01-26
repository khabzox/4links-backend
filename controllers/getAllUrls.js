import Url from "../models/Url.js"

export const getAllUrls = async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 })
    res.json(urls)
  } catch (error) {
    console.error("Error fetching URLs:", error)
    res.status(500).json({ error: "Server error" })
  }
}
