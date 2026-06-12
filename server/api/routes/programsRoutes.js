const express = require("express");
const controller = require("../controllers/programsController");

const router = express.Router();
router.get("/", controller.getPrograms);
module.exports = router;
