import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_URL: process.env.API_URL,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
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
