import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true, },
  typescript: {
    ignoreBuildErrors: true, // Skip TypeScript type checking during build
  },
};

export default nextConfig;
