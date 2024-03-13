/** @type {import("next").NextConfig} */
const config = {
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
};

export default config;
