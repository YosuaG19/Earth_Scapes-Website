import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co', 
      },
      {
        protocol: 'http',
        hostname: 'googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;