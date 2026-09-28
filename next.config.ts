import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Allow local public images
    remotePatterns: [],
  },
  experimental: {
    // Opt in to better server component handling
  },
};

export default nextConfig;
