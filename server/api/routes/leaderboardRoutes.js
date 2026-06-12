const express = require("express");
const controller = require("../controllers/leaderboardController");

const router = express.Router();
router.get("/", controller.getLeaderboard);
module.exports = router;
