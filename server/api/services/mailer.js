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

module.exports = { sendContactMessage };
