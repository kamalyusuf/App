import { checkEnv, EmailQueue, IEmailTokenInput, Jobs } from "@app/water";
import { Job, Worker } from "bullmq";
import consola from "consola";
import "dotenv-safe/config";
import { redis } from "./lib/redis";
import { EmailService } from "./services/Email";

const emailQueue = new EmailQueue();

emailQueue.init(redis);

const jobs: any = {
  [Jobs.EMAIL_VERIFICATION]: async (job: Job<IEmailTokenInput>) => {
    await EmailService.sendVerificationEmail(job.data);
  },
  [Jobs.FORGOT_PASSWORD]: async (job: Job<IEmailTokenInput>) => {
    await EmailService.sendForgotPasswordEmail(job.data);
  }
};

async function init() {
  checkEnv([
    "NODE_ENV",
    "SENDGRID_EMAIL",
    "SENDGRID_API_KEY",
    "REDIS_URL",
    "SHAWARMA_URL",
    "KOFTE_URL"
  ]);

  new Worker(
    emailQueue.queueName,
    async (job) => {
      try {
        await jobs[job.name]?.(job);
      } catch (e) {
        throw e;
      }
    },
    { connection: redis }
  );
  consola.info("Worker started");
}

init().catch((e) => {
  console.log(e);
  process.exit(1);
});
