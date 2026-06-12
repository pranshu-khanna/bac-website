const siteData = require("../data/siteData");

exports.getRequest = (_req, res) => {
  res.json({
    title: "Requests",
    intro:
      "Use this page to reach the BAC team for program requests, partnership inquiries, or general questions.",
    contactEmail: siteData.contactEmail,
    contactPath: "/contact",
  });
};
