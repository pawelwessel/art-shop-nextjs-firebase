/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
