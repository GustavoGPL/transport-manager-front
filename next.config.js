/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  trailingSlash: true,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "www.iconpacks.net",
          pathname: "**",
        },
      ],
      // domains: ["www.iconpacks.net"],
    },
}

module.exports = nextConfig
