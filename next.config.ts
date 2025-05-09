/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false, // Set to true temporarily if TypeScript errors persist
  },
  reactStrictMode: true,
};

module.exports = nextConfig;