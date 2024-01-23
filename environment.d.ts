namespace NodeJS {
  interface ProcessEnv {
    GITHUB_ID: string;
    GITHUB_SECRET: string;
    NODE_ENV: "development" | "production";
  }
}
