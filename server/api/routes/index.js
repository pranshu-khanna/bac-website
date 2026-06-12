const express = require("express");
const homeRoutes = require("./homeRoutes");
const aboutRoutes = require("./aboutRoutes");
const contactRoutes = require("./contactRoutes");
const eventsRoutes = require("./eventsRoutes");
const programsRoutes = require("./programsRoutes");
const tournamentsRoutes = require("./tournamentsRoutes");
const leaderboardRoutes = require("./leaderboardRoutes");
const membershipRoutes = require("./membershipRoutes");
const resourcesRoutes = require("./resourcesRoutes");
const requestRoutes = require("./requestRoutes");
const loginRoutes = require("./loginRoutes");
const enrichmentRoutes = require("./enrichmentRoutes");

const router = express.Router();

router.use("/home", homeRoutes);
router.use("/about", aboutRoutes);
router.use("/contact", contactRoutes);
router.use("/events", eventsRoutes);
router.use("/programs", programsRoutes);
router.use("/tournaments", tournamentsRoutes);
router.use("/leaderboard", leaderboardRoutes);
router.use("/membership", membershipRoutes);
router.use("/resources", resourcesRoutes);
router.use("/request", requestRoutes);
router.use("/login", loginRoutes);
router.use("/enrichment", enrichmentRoutes);

router.get("/health", (_req, res) => {
  res.json({ ok: true });
});

module.exports = router;
