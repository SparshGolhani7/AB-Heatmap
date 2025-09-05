import type { NextConfig } from "next";

// Debug environment variable loading
console.log("🔑 PERPLEXITY_API_KEY:", process.env.PERPLEXITY_API_KEY ? "Loaded" : "Missing");

const nextConfig: NextConfig = {
  // Remove "export" to enable API routes
  // output: "export", // This disables API routes!
  images: {
    unoptimized: true,
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
};

export default nextConfig;
