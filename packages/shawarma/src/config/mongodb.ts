import mongoose from "mongoose";
import { logger } from "../lib/logger";

class MongoDB {
  async connect(): Promise<void> {
    try {
      await mongoose.connect(process.env.MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true
      });
      logger.info("Connected to MongoDB");
    } catch (e) {
      logger.fatal(e);
      process.exit(1);
    }
  }
}

export const mongodb = new MongoDB();
