import { Application } from "express";
import { Server } from "http";
import { logger } from "./logger";

export const start = async (app: Application): Promise<Server> => {
  return new Promise<Server>((resolve, reject) => {
    const PORT = Number(process.env.PORT);
    const server = app.listen(PORT).on("error", reject);
    logger.info(`App listening on http://localhost:${PORT}`);
    resolve(server);
  });
};
