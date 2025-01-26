import axios from "axios";

const SAFE_BROWSING_API_KEY = process.env.SAFE_BROWSING_API_KEY;

export const checkUrlSafety = async (url: string): Promise<boolean> => {
  const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${SAFE_BROWSING_API_KEY}`;

  const requestPayload = {
    client: {
      clientId: "your-client-id",
      clientVersion: "1.0",
    },
    threatInfo: {
      threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"],
      platformTypes: ["ANY_PLATFORM"],
      threatEntryTypes: ["URL"],
      threatEntries: [{ url }],
    },
  };

  try {
    const response = await axios.post(apiUrl, requestPayload);

    // If the response contains matches, the URL is malicious
    return !response.data.matches;
  } catch (error) {
    console.error("Error checking URL safety:", error);
    return false; // Assume unsafe if API fails
  }
};
