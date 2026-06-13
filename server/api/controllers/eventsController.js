const siteData = require("../data/siteData");

exports.getEvents = (_req, res) => {
  const embedUrl = `${siteData.chessRosterBase}/organizers/${siteData.chessRosterOrganizerId}`;

  res.json({
    title: "Upcoming events",
    embedUrl,
    notice:
      "Tournament listings are powered by ChessRoster. Registration links open on the external site.",
  });
};
