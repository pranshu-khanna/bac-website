const siteData = require("../data/siteData");

exports.getResults = (_req, res) => {
  res.json({
    title: "Ratings & Results",
    intro: "Open a year to view the full results spreadsheet.",
    tabs: siteData.resultsArchiveTabs,
  });
};
