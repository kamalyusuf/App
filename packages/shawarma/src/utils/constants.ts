export const __prod__ = process.env.NODE_ENV === "production";
export const SESSION_NAME = "app:session";
export const SESSION_SECRET = process.env.SESSION_SECRET as string;
