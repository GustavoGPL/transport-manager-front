/** @type {import('next').NextConfig} */

let ENV = {};
switch (process.env.NEXT_PUBLIC_AMB) {
  case "local": {
    ENV = {
      baseURL: "http://localhost:8080",//"https://transport-manager-back.vercel.app/", // "http://localhost:8080", //  "http://192.168.0.8:8080", //
    };
    break;
  }
  case "dev": {
    ENV = {
        baseURL: "https://e-stock-backend-dev-159454469390.us-central1.run.app/", // "https://estock-backend-440615.rj.r.appspot.com",
    };
    break;
  }
  case "prod":
    ENV = {
        baseURL: "https://spca-dev.sspds.ce.gov.br",
    };
    break;
  default:
    ENV = {
        baseURL: "https://estock-backend-440615.rj.r.appspot.com",
    };
}

const nextConfig = {
  env: {
    ...ENV,
  },
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
