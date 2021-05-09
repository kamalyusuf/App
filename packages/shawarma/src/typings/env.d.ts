declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    NODE_ENV: string;
    MONGO_URL: string;
    REDIS_URL: string;
    SESSION_SECRET: string;
    SESSION_NAME: string;
    KOFTE_URL: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
  }
}