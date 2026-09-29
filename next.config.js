const { createHash } = require('crypto');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {},
  outputFileTracingRoot: process.cwd(),
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
