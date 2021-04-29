declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    SENDGRID_EMAIL: string;
    SENDGRID_API_KEY: string;
    REDIS_URL: string;
    SHAWARMA_URL: string;
    WEB_URL: string;
  }
}