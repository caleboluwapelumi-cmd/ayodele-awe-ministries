import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 allows only q=75 by default and 400s anything else. 100 is used by
    // the low-res BLCN church-order graphic to avoid compounding its softness.
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
