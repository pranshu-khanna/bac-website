const express = require("express");
const controller = require("../controllers/tournamentsController");

const router = express.Router();
router.get("/", controller.getTournaments);
module.exports = router;
