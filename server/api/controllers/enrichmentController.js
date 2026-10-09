const data = require("../data/enrichmentData");
const { pages } = require("../data/enrichmentPages");
const mirroredPages = require("../data/enrichmentMirroredPages");
const { searchEnrichment } = require("../data/enrichmentSearchIndex");
const { buildEnrichmentCalendar } = require("../data/enrichmentCalendar");
const { resolveProgramPage } = require("../data/enrichmentProgramPages");

exports.getEnrichment = (_req, res) => {
  res.json(data);
};

exports.getEnrichmentCalendar = (_req, res) => {
  res.json(buildEnrichmentCalendar());
};

exports.getEnrichmentPage = (req, res) => {
  const pagePath = String(req.params.slug || "");
  // Prefer freshly mirrored live-site content for calendar destinations.
  const page = mirroredPages[pagePath] || pages[pagePath] || resolveProgramPage(pagePath);
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
