import { EmailQueue } from "@app/water";
import { redis } from "./redis";

const emailQueue = new EmailQueue();

emailQueue.init(redis);

export { emailQueue };
