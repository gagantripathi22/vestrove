/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  experimental: {
    // appDir: true,
    serverActions: true,
  },
};

module.exports = nextConfig;
