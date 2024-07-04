/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "hallowed-cheetah-801.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
