import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  images: { unoptimized: true },
  allowedDevOrigins: ["192.168.1.*"]
};

export default nextConfig;
