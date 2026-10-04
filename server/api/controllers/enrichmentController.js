const data = require("../data/enrichmentData");
const { pages } = require("../data/enrichmentPages");
const { searchEnrichment } = require("../data/enrichmentSearchIndex");
const { buildEnrichmentCalendar } = require("../data/enrichmentCalendar");

exports.getEnrichment = (_req, res) => {
  res.json(data);
};

exports.getEnrichmentCalendar = (_req, res) => {
  res.json(buildEnrichmentCalendar());
};

exports.getEnrichmentPage = (req, res) => {
  const page = pages[req.params.slug];
  if (!page) {
    return res.status(404).json({ error: "Enrichment page not found" });
  }
  return res.json(page);
};

exports.searchEnrichment = (req, res) => {
  const q = String(req.query.q || "");
  const results = searchEnrichment(q);
  res.json({ q, results });
};
