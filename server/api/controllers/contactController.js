const siteData = require("../data/siteData");

exports.getContact = (_req, res) => {
  res.json({
    address: siteData.address,
    mapEmbedUrl: siteData.mapEmbedUrl,
    contactEmail: siteData.contactEmail,
    hours: "Office hours vary — email ask@bayareachess.com for scheduling.",
    connectLinks: [
      {
        label: "Request form",
        href: "https://bayareachess.com/request",
      },
      {
        label: "Email",
        description: "events@bayareachess.com",
        href: "mailto:events@bayareachess.com",
      },
      {
        label: "WhatsApp",
        href: "https://bayareachess.com/askbac",
      },
      ...siteData.socialLinks,
    ],
  });
};

exports.submitContact = (req, res) => {
  const { name, email, message } = req.body || {};
  if (!email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "Email and message are required." });
  }
  res.json({
    ok: true,
    mailto: `mailto:${siteData.contactEmail}?subject=${encodeURIComponent(
      "Contact from Bay Area Chess website",
    )}&body=${encodeURIComponent(`Name: ${name || ""}\nEmail: ${email}\n\n${message}`)}`,
  });
};
