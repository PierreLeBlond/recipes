namespace NodeJS {
  interface ProcessEnv {
    GITHUB_ID: string;
    GITHUB_SECRET: string;
    AWS_ENDPOINT_URL_S3: string;
    NODE_ENV: "development" | "production";
  }
}
