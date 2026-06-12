const express = require("express");
const controller = require("../controllers/resourcesController");

const router = express.Router();
router.get("/", controller.getResources);
module.exports = router;
