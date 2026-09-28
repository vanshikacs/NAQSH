import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // Avoid blocking production deployments on stylistic lints
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
