const express = require("express");
const passport = require("passport");
const {
  googleCallback,
  setupUsername,
} = require("../controller/authController");
const { authenticateToken } = require("../Middlewear/authMiddlewear");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  googleCallback
);

router.post("/setup-username", authenticateToken, setupUsername);

module.exports = router;
