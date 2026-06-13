const bacoinInfo = require("../data/bacoinInfo");
const { getLeaderboardCache } = require("../services/leaderboardFetcher");

exports.getLeaderboard = (_req, res) => {
  const cache = getLeaderboardCache();

  res.json({
    entries: cache.entries,
    totalPlayers: cache.totalPlayers,
    displayLimit: cache.displayLimit ?? 25,
    fetchedAt: cache.fetchedAt,
    updatedNote: "Data synced from the BACoin leaderboard sheet",
    bacoinInfo,
  });
};
