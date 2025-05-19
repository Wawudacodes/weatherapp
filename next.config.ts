import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "plus.unsplash.com",
      "openweathermap.org",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // 🚨 This skips ESLint errors on Vercel
  },
};

export default nextConfig;
