const siteData = require("../data/siteData");
const { sendContactMessage } = require("../services/mailer");

exports.getContact = (_req, res) => {
  res.json({
    address: siteData.address,
    mapEmbedUrl: siteData.mapEmbedUrl,
    contactEmail: siteData.contactEmail,
    hours: "Office hours vary — email ask@bayareachess.com for scheduling.",
    connectLinks: [
      {
        label: "Request form",
        description: "general tournament related requests",
        href: "https://docs.google.com/forms/d/e/1FAIpQLSccXbIYitBY3crqxJzApL0Uo8XgrRFCoomvPZ5Zf0LB3WF8pg/viewform",
      },
      {
        label: "Email",
        description: "events@bayareachess.com",
        href: "mailto:events@bayareachess.com",
      },
      {
        label: "WhatsApp",
        description: "Be part of community on Whatsapp",
        href: "https://chat.whatsapp.com/L7siYpfZTPPF0lmez7taz2",
      },
      {
        label: "408.409.6596",
        icon: "Phone",
        detail:
          "Phone is answered between 8AM-8PM. If we don’t answer, please leave message and will get back to you within 24 hours.",
      },
      ...siteData.socialLinks,
    ],
  });
};

exports.submitContact = async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "Email and message are required." });
  }

  try {
    await sendContactMessage({ name, email, message });
    return res.json({ ok: true });
  } catch (err) {
    console.error("Contact form email failed:", err.message);
    return res.status(502).json({
      error: "Could not send your message. Please try again later.",
    });
  }
};
