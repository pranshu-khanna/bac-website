const express = require("express");
const controller = require("../controllers/loginController");

const router = express.Router();

router.get("/", controller.getLogin);
router.post("/", controller.postLogin);
router.post("/signup", controller.postSignup);
router.post("/forgot-password", controller.postForgotPassword);
router.post("/reset-password", controller.postResetPassword);
router.post("/logout", controller.postLogout);
router.get("/me", controller.getMe);
router.get("/google", controller.startGoogle);
router.get("/google/callback", controller.googleCallback);

module.exports = router;
