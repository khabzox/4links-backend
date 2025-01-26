import Url from "../models/Url.js"

export const deleteUrl = async (req, res) => {
  const { shortUrl } = req.params

  try {
    const url = await Url.findOneAndDelete({ shortUrl })

    if (!url) {
      return res.status(404).json({ error: "URL not found" })
    }

    res.json({ message: "URL deleted successfully" })
  } catch (error) {
    console.error("Error deleting URL:", error)
    res.status(500).json({ error: "Server error" })
  }
}

