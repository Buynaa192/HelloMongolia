import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "cloudinary-marketing-res.cloudinary.com",
      "www.qantas.com",
      "www.escapetomongolia.com",
      "example.com",
      "3nmhvj5b8bek5uam.public.blob.vercel-storage.com",
    ],
  },
};

export default nextConfig;
