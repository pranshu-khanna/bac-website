const siteData = require("../data/siteData");

exports.getTournaments = (_req, res) => {
  const params = new URLSearchParams({
    status: "Upcoming",
    organizer: "BAY AREA CHESS",
  });
  const embedUrl = `${siteData.chessRosterBase}${siteData.tournamentsPath}?${params}`;

  res.json({
    title: "Upcoming tournaments",
    embedUrl,
    fullPageLabel: "Click here to open in full page view",
  });
};
