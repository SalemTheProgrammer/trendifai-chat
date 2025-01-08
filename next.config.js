/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  webpack: (config) => {
    config.resolve.preferRelative = true
    return config
  }
};

module.exports = nextConfig;
