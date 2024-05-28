/** @type {import("next").NextConfig} */
const config = {
  distDir: "build",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/*/**",
      },
      {
        protocol: "https",
        hostname: "fly.storage.tigris.dev",
        port: "",
        pathname: "/*/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default config;
