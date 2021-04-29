declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    NODE_ENV: string;
    MONGO_URL: string;
    REDIS_URL: string;
    SESSION_SECRET: string;
  }
}