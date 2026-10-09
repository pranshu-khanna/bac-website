const express = require("express");
const {
  getEnrichment,
  getEnrichmentPage,
  getEnrichmentCalendar,
  searchEnrichment,
} = require("../controllers/enrichmentController");

const router = express.Router();

router.get("/", getEnrichment);
router.get("/calendar", getEnrichmentCalendar);
router.get("/search", searchEnrichment);
router.get("/pages/camp/:slug", (req, res, next) => {
  req.params.slug = `camp/${req.params.slug}`;
  return getEnrichmentPage(req, res, next);
});
router.get("/pages/event/:slug", (req, res, next) => {
  req.params.slug = `event/${req.params.slug}`;
  return getEnrichmentPage(req, res, next);
});
router.get("/pages/:slug", getEnrichmentPage);

module.exports = router;
