exports.getTournaments = (_req, res) => {
  const embedUrl = "https://bayareachess.chessroster.com/tournaments";

  res.json({
    title: "Upcoming tournaments",
    embedUrl,
    openUrl: embedUrl,
    openLabel: "Click here to open directly in ChessRoster",
  });
};
