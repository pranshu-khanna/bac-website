const siteData = require("../data/siteData");

exports.getEvents = (_req, res) => {
  const params = new URLSearchParams({
    status: "Upcoming",
    organizer: "BAY AREA CHESS",
  });
  const embedUrl = `${siteData.chessRosterBase}${siteData.tournamentsPath}?${params}`;

  res.json({
    title: "Upcoming events",
    embedUrl,
    notice:
      "Tournament listings are powered by ChessRoster. Registration links open on the external site.",
  });
};
