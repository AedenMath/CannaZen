/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cocorikush.fr' },
      { protocol: 'https', hostname: 'cocorikush.com' },
    ],
  },
}
module.exports = nextConfig
