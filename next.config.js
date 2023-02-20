/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'i.dummyjson.com',
      'robohash.org',
    ],
  },
}

module.exports = nextConfig
