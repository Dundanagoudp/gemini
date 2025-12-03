import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  output: 'standalone',
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
}

export default nextConfig

