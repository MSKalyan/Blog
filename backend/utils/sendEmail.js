import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SES_SMTP_HOST,
    port: Number(process.env.SES_SMTP_PORT || 587),
    secure: false, // for 587 use STARTTLS
    auth: {
      user: process.env.SES_SMTP_USER,
      pass: process.env.SES_SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SES_FROM_EMAIL,
    to,
    subject,
    html,
  });
};
