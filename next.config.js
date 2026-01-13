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
        hostname: 'dev-elartedeforjarelhierrobackend.pantheonsite.io',
      },
    ],
  },
}

module.exports = nextConfig
