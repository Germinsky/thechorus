import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['thread-stream', 'pino', 'pino-pretty'],
  turbopack: {},
};

export default nextConfig;
