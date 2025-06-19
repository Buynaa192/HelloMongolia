import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "cloudinary-marketing-res.cloudinary.com",
      "www.qantas.com",
      "www.escapetomongolia.com",
    ],
  },
};

export default nextConfig;
