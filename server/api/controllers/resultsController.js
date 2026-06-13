const siteData = require("../data/siteData");
const { getResultsCache } = require("../services/resultsFetcher");

exports.getResults = (_req, res) => {
  const cache = getResultsCache();

  res.json({
    title: "Ratings & Results",
    sheetTitle: "BayAreaChess Events: 2026 Results",
    legends: [
      "💲: Go to bayareachess.com/prizeform if it's your first time winning or if you want to change your payment method",
      "🪙: Go to bayareachess.com/bacoins to view leaderboard or redeem coins | ❌: No prize | 🏆 or 🏅 or 🕰️: Prizes distributed onsite",
    ],
    tabs: siteData.resultsArchiveTabs,
    entries: cache.entries,
    fetchedAt: cache.fetchedAt,
  });
};
