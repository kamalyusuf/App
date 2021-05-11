import { IEmailTokenInput, ISendInvitationEmail } from "@app/water";
import sgMail from "@sendgrid/mail";
import consola from "consola";
import ejs from "ejs";
import path from "path";
import { htmlToText } from "html-to-text";

sgMail.setApiKey(process.env.SENDGRID_API_KEY2);

export class EmailService {
  static async sendVerificationEmail({ email, token }: IEmailTokenInput) {
    const link = `${process.env.KOFTE_URL}/verify?token=${token}&email=${email}`;
    const p = path.join(__dirname, "..", "templates", "email-verification.ejs");

    const html = await ejs.renderFile(p, { email, link });
    const message = {
      to: email,
      from: `App <${process.env.SENDGRID_EMAIL2}>`,
      subject: "Verify your email",
      html,
      text: htmlToText(html)
    };

    await sgMail.send(message);
    consola.success(`Verification email sent to ${email}`);
  }

  static async sendForgotPasswordEmail({ email, token }: IEmailTokenInput) {
    const link = `${process.env.KOFTE_URL}/reset/${token}`;
    const p = path.join(__dirname, "..", "templates", "forgot-password.ejs");

    const html = await ejs.renderFile(p, { email, link });
    const message = {
      to: email,
      from: `App <${process.env.SENDGRID_EMAIL2}>`,
      subject: "Ask and you shall receive... a password reset",
      html,
      text: htmlToText(html)
    };

    await sgMail.send(message);
    consola.success(`Forgot password email sent to ${email}`);
  }

  static async sendInvitationEmail({
    invited_by,
    team,
    invite_to_email
  }: ISendInvitationEmail) {
    const link = `${process.env.KOFTE_URL}/invites`;
    const p = path.join(__dirname, "..", "templates", "team-invitation.ejs");

    const html = await ejs.renderFile(p, { invited_by, team, link });
    const message = {
      to: invite_to_email,
      from: `App <${process.env.SENDGRID_EMAIL2}>`,
      subject: "Team Invitation",
      html,
      text: htmlToText(html)
    };

    await sgMail.send(message);
    consola.success(`Team invitation email sent to ${invite_to_email}`);
  }
}
