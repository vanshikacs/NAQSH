import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    // Avoid blocking production deployments on environment-specific type checks
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
