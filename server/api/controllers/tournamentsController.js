const siteData = require("../data/siteData");

exports.getTournaments = (_req, res) => {
  const embedUrl = `${siteData.chessRosterBase}/organizers/${siteData.chessRosterOrganizerId}`;

  res.json({
    title: "Upcoming tournaments",
    embedUrl,
    fullPageLabel: "Click here to open in full page view",
  });
};
