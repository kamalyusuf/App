import "express-async-errors";

import connectRedis from "connect-redis";
import express, { Application } from "express";
import session from "express-session";
import passport from "passport";
import cors from "cors";

import { IUser } from "@app/water";
import { NotFoundError, redis } from "./lib";
import { globalErrorHandler } from "./middlewares";
import { Passport } from "./config";
import { authRouter } from "./modules/auth";
import { teamsRouter } from "./modules/teams";
import { accountRouter } from "./modules/account";
import { providersRouter } from "./modules/providers";
import { teamMembersRouter } from "./modules/team-members";
import { invitesRouter } from "./modules/invites";

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

const app: Application = express();

const RedisStore = connectRedis(session);

Passport.init(passport);

app.set("trust proxy", 1);
app.use(cors({ origin: process.env.KOFTE_URL, credentials: true }));
app.use(express.json());

app.use(
  session({
    store: new RedisStore({
      client: redis,
      disableTouch: true,
      prefix: "app:session::"
    }),
    name: process.env.SESSION_NAME as string,
    secret: process.env.SESSION_SECRET as string,
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

app.get("/api/ping", (_, res) => res.send("pong"));
app.use("/api/account", accountRouter);
app.use("/api/auth", authRouter);
app.use("/api/team-members", teamMembersRouter);
app.use("/api/teams", teamsRouter);
app.use("/api/providers", providersRouter);
app.use("/api/invites", invitesRouter);

app.use(() => {
  throw new NotFoundError("Route not found");
});

app.use(globalErrorHandler);

export { app };
