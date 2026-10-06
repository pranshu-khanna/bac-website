const nodemailer = require("nodemailer");

function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number.parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "Email is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in the API environment.",
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

async function sendContactMessage({ name, email, message }) {
  const to = process.env.CONTACT_TO_EMAIL || "info.studiva@gmail.com";
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  const transport = getTransport();

  const safeName = (name || "").trim() || "Anonymous";
  const safeEmail = email.trim();
  const safeMessage = message.trim();

  await transport.sendMail({
    from,
    to,
    replyTo: safeEmail,
    subject: `Contact from Bay Area Chess website — ${safeName}`,
    text: `Name: ${safeName}\nEmail: ${safeEmail}\n\n${safeMessage}`,
  });

  return { to };
}

async function sendPasswordResetEmail({ to, resetUrl }) {
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  const transport = getTransport();

  await transport.sendMail({
    from,
    to,
    subject: "Reset your Bay Area Chess password",
    text: [
      "We received a request to reset your Bay Area Chess password.",
      "",
      `Open this link to choose a new password:`,
      resetUrl,
      "",
      "This link expires in 2 hours. If you did not request a reset, you can ignore this email.",
    ].join("\n"),
  });

  return { to };
}

module.exports = { sendContactMessage, sendPasswordResetEmail };
