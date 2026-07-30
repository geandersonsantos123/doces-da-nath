import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dm9mnc97u/image/upload/**",
      },
    ],
  },
};

export default nextConfig;
