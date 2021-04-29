import { BullMQAdapter, router, setQueues } from "bull-board";
import connectRedis from "connect-redis";
import express, { Application } from "express";
import "express-async-errors";
import session from "express-session";
import passport from "passport";
import "./config/passport";
import { emailQueue } from "./lib/emailQueue";
import { NotFoundError } from "./lib/errors/NotFoundError";
import { redis } from "./lib/redis";
import { IUser } from "./lib/types";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { authRoutes } from "./routes/auth";
import { SESSION_NAME, SESSION_SECRET } from "./utils/constants";

if (process.env.NODE_ENV !== "test") {
  setQueues([new BullMQAdapter(emailQueue.queue!)]);
}

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

const app: Application = express();

const RedisStore = connectRedis(session);

app.set("trust proxy", 1);
app.use(express.json());

app.use(
  session({
    store: new RedisStore({
      client: redis,
      disableTouch: true,
      prefix: "app:session::"
    }),
    name: SESSION_NAME,
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: "lax"
      // secure: __prod__
      // domain  : __prod__ ? "populate here" : "undefined"
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/queues", router);
app.use("/api/auth", authRoutes);

app.use(() => {
  throw new NotFoundError("Route not found");
});

app.use(globalErrorHandler);

export { app };
