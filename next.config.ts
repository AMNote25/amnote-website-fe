import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: false, // Keep ESLint but disable the most problematic rules
  },
};

export default nextConfig;
