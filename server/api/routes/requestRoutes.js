const express = require("express");
const controller = require("../controllers/requestController");

const router = express.Router();
router.get("/", controller.getRequest);
module.exports = router;
