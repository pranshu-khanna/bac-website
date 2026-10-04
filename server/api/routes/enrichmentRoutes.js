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
router.get("/pages/:slug", getEnrichmentPage);

module.exports = router;
