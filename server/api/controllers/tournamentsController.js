exports.getTournaments = (_req, res) => {
  res.json({
    title: "Upcoming tournaments",
    registerUrl: "https://bayareachess.chessroster.com/",
    ctaLabel: "Register for Upcoming Rated Tournaments",
  });
};
