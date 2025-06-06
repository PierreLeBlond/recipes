/** @type {import("next").NextConfig} */
const config = {
  output: "standalone",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
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
        hostname: "ht2-storage.n0c.com",
        port: "",
        pathname: "/*/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, options) => {
    if (!options.dev) {
      config.devtool = options.isServer ? false : "cheap-module-source-map";
    }
    return config;
  },
};

export default config;
