const siteData = require("../data/siteData");

exports.getContact = (_req, res) => {
  res.json({
    address: siteData.address,
    mapEmbedUrl: siteData.mapEmbedUrl,
    contactEmail: siteData.contactEmail,
    hours: "Office hours vary — email ask@bayareachess.com for scheduling.",
    sidebarLinks: [
      { label: "Tournaments", path: "/#tournaments" },
      { label: "Membership", path: "/membership" },
      { label: "Resources", path: "/resources" },
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
