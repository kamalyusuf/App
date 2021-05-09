if (process.env.NODE_ENV !== "test") {
  require("dotenv-safe").config();
}
import { checkEnv } from "@app/water";
import { Server } from "http";
import { app } from "./app";
import { mongodb } from "./config";
import { logger, start } from "./lib";
import { exitHandler } from "./utils";

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
