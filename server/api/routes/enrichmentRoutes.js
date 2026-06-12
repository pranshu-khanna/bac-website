const express = require("express");
const { getEnrichment } = require("../controllers/enrichmentController");

const router = express.Router();

router.get("/", getEnrichment);

module.exports = router;
