const express = require("express");
const homeRoutes = require("./homeRoutes");
const aboutRoutes = require("./aboutRoutes");
const contactRoutes = require("./contactRoutes");
const eventsRoutes = require("./eventsRoutes");
const tournamentsRoutes = require("./tournamentsRoutes");
const leaderboardRoutes = require("./leaderboardRoutes");
const loginRoutes = require("./loginRoutes");
const enrichmentRoutes = require("./enrichmentRoutes");
const resultsRoutes = require("./resultsRoutes");
const faqRoutes = require("./faqRoutes");

const router = express.Router();

router.use("/home", homeRoutes);
router.use("/about", aboutRoutes);
router.use("/contact", contactRoutes);
router.use("/events", eventsRoutes);
router.use("/tournaments", tournamentsRoutes);
router.use("/leaderboard", leaderboardRoutes);
router.use("/login", loginRoutes);
router.use("/enrichment", enrichmentRoutes);
router.use("/results", resultsRoutes);
router.use("/faq", faqRoutes);

router.get("/health", (_req, res) => {
  res.json({ ok: true });
});

module.exports = router;
