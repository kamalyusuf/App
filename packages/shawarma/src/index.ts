if (process.env.NODE_ENV !== "test") {
  require("dotenv-safe").config();
}
import "colors";
import { checkEnv, IInvite } from "@app/water";
import { Server } from "http";
import { app, passport, sessionmw } from "./app";
import { mongodb } from "./config";
import {
  emitter,
  logger,
  onSocketConnection,
  redis,
  start,
  SocketService
} from "./lib";
import { exitHandler } from "./utils";
import { Server as SocketServer, Socket } from "socket.io";
import { createAdapter } from "socket.io-redis";
import { ExtendedError } from "socket.io/dist/namespace";
import { Request } from "express";
import { instrument } from "@socket.io/admin-ui";

let _server: Server;

async function main() {
  checkEnv([
    "PORT",
    "NODE_ENV",
    "MONGO_URL",
    "REDIS_URL",
    "SESSION_SECRET",
    "SESSION_NAME",
    "KOFTE_URL",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "GITHUB_CLIENT_ID",
    "GITHUB_CLIENT_SECRET"
  ]);

  await mongodb.connect();
  _server = await start(app);

  const io = new SocketServer(_server, {
    cors: {
      origin: [process.env.KOFTE_URL, "https://admin.socket.io"],
      credentials: true
    },
    serveClient: false,
    pingTimeout: 60000,
    pingInterval: 15000
  });

  const wrap = (middleware: Function) => (
    socket: Socket,
    next: (error: ExtendedError) => void
  ) => middleware(socket.request, {}, next);

  io.adapter(
    createAdapter({
      pubClient: redis.duplicate(),
      subClient: redis.duplicate()
    })
  );

  io.use(wrap(sessionmw));
  io.use(wrap(passport.initialize()));
  io.use(wrap(passport.session()));

  io.use((socket, next) => {
    const req = socket.request as Request;
    if (req.isUnauthenticated()) {
      return next(new Error("Not authorized"));
    }
    next();
  });

  io.on("connection", onSocketConnection(io));
  const socketService = new SocketService(io);

  instrument(io, { auth: false });

  emitter.on("invite:new", ({ invite }: { invite: IInvite }) => {
    socketService.emitIfExists(invite.invite_to_email, "invite:new", {
      invite
    });
  });

  emitter.on("invite:accept", ({ invite }: { invite: IInvite }) => {
    socketService.emitIfExists(invite.invited_by.email, "invite:accept", {
      invite
    });
  });
}

main().catch((e) => {
  logger.fatal(e);
  process.exit(1);
});

// @todo: capture with Sentry
process.on("uncaughtException", (error: Error) => {
  logger.fatal(error);
  exitHandler(_server);
});

process.on("unhandledRejection", (error: Error) => {
  logger.fatal(error);
  exitHandler(_server);
});

process.on("SIGTERM", () => {
  if (_server) {
    _server.close();
  }
});
