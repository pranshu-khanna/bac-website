const express = require("express");
const controller = require("../controllers/membershipController");

const router = express.Router();
router.get("/", controller.getMembership);
module.exports = router;
