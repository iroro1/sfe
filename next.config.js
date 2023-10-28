/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "cdn.weatherapi.com",
        port: "",
        pathname: "/weather/64x64/**",
      },
    ],
  },
};

module.exports = nextConfig;
