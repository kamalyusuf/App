import { checkEnv, EmailQueue, Jobs, MyJobs } from "@app/water";
import { Worker } from "bullmq";
import consola from "consola";
import "dotenv-safe/config";
import { redis } from "./lib/redis";
import * as EmailService from "./services/Email";

const emailQueue = new EmailQueue();

emailQueue.init(redis);

const jobs: MyJobs = {
  [Jobs.EMAIL_VERIFICATION]: async (job) => {
    await EmailService.sendVerificationEmail(job.data);
  },
  [Jobs.FORGOT_PASSWORD]: async (job) => {
    await EmailService.sendForgotPasswordEmail(job.data);
  },
  [Jobs.TEAM_INVITATION]: async (job) => {
    await EmailService.sendInvitationEmail(job.data);
  }
};

async function bootstrap() {
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
        await jobs[job.name as Jobs]?.(job);
      } catch (e) {}
    },
    { connection: redis }
  );
  consola.info("Worker started");
}

bootstrap().catch(async (e) => {
  console.log(e);
  // await bootstrap();
  process.exit(1);
});
