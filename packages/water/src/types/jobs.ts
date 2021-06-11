import { ISendInvitationEmail } from "@app/water";
import { IEmailTokenInput } from "@app/water";
import { Job } from "bullmq";

export enum Jobs {
  EMAIL_VERIFICATION = "email:verification",
  FORGOT_PASSWORD = "forgot:password",
  TEAM_INVITATION = "team:invitation"
}

export type MyJobs = {
  [Jobs.EMAIL_VERIFICATION]: (job: Job<IEmailTokenInput>) => Promise<void>;
  [Jobs.FORGOT_PASSWORD]: (job: Job<IEmailTokenInput>) => Promise<void>;
  [Jobs.TEAM_INVITATION]: (job: Job<ISendInvitationEmail>) => Promise<void>;
};
