/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/blog',
        destination: '/blog/page/0',
      },
      {
        source: '/catalogo',
        destination: '/catalogo/page/0'
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_IMAGE_DOMAIN,
      },
    ],
  },
}

module.exports = nextConfig
