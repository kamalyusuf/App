declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    SENDGRID_EMAIL: string;
    SENDGRID_API_KEY: string;
    SENDGRID_EMAIL2: string;
    SENDGRID_API_KEY2: string;
    REDIS_URL: string;
    SHAWARMA_URL: string;
    WEB_URL: string;
  }
}