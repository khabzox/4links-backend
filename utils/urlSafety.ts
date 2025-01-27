/**
 * Checks the safety of a given URL using the Google Safe Browsing API.
 *
 * @param url - The URL to be checked for safety.
 * @returns A promise that resolves to a boolean indicating whether the URL is safe (true) or malicious (false).
 *
 * @throws Will log an error and return false if the API request fails.
 *
 * @example
 * ```typescript
 * const isSafe = await checkUrlSafety("http://example.com");
 * console.log(isSafe); // true or false
 * ```
 */

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
