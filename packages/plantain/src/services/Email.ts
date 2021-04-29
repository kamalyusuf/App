import { IEmailTokenInput } from "@app/water";
import sgMail from "@sendgrid/mail";
import consola from "consola";
import ejs from "ejs";
import path from "path";
import { htmlToText } from "html-to-text";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export class EmailService {
  static async sendVerificationEmail({ email, token }: IEmailTokenInput) {
    const link = `${process.env.SHAWARMA_URL}/api/auth/verify?token=${token}&email=${email}`;
    const p = path.join(__dirname, "..", "templates", "email-verification.ejs");

    const html = await ejs.renderFile(p, { email, link });
    const message = {
      to: email,
      from: `Populate here <${process.env.SENDGRID_EMAIL}>`,
      subject: "Verify your email",
      html,
      text: htmlToText(html)
    };

    await sgMail.send(message);
    consola.success(`Verification email sent to ${email}`);
  }

  static async sendForgotPasswordEmail({ email, token }: IEmailTokenInput) {
    const link = `${process.env.WEB_URL}/reset/${token}`;
    const p = path.join(__dirname, "..", "templates", "forgot-password.ejs");

    const html = await ejs.renderFile(p, { email, link });
    const message = {
      to: email,
      from: `Populate here <${process.env.SENDGRID_EMAIL}>`,
      subject: "Reset your password",
      html,
      text: htmlToText(html)
    };

    await sgMail.send(message);
    consola.success(`Forgot password email sent to ${email}`);
  }
}
