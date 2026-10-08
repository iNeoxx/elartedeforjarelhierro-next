/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_IMAGE_DOMAIN,
        pathname: "/sites/default/files/**",
      },
    ],
    qualities: [70, 75],
  },
}

module.exports = nextConfig