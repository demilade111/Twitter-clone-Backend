const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Authenticate with Google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// Google auth callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, generate token.
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.redirect(`/?token=${token}`);
  }
);

module.exports = router;
