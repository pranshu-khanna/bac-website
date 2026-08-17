const data = require("../data/enrichmentData");

exports.getEnrichment = (_req, res) => {
  res.json(data);
};
