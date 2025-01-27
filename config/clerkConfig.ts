import { clerkMiddleware } from "@clerk/express";

// Get the Clerk API key from environment variables
const clerkApiKey = process.env.CLERK_API_KEY;

if (!clerkApiKey) {
  throw new Error("CLERK_API_KEY is not defined in the environment variables");
}

// Initialize Clerk middleware with the API key
const clerk = clerkMiddleware({
  secretKey: clerkApiKey,
});

export default clerk;
