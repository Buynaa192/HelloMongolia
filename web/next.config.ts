import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_URL: process.env.API_URL,
  },
  images: {
    domains: ["res.cloudinary.com", "cloudinary-marketing-res.cloudinary.com"],
  },
};

export default nextConfig;
