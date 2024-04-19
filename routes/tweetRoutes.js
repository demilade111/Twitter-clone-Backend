const express = require("express");
const {
  getTweetsByUser,
  createTweet,
  updateTweet,
  deleteTweet,
} = require("../controller/tweetController");
const { authenticateToken } = require("../Middlewear/authMiddlewear");
const router = express.Router();

router.post("/create", authenticateToken, createTweet);
router.get("/:userId", authenticateToken, getTweetsByUser);
router.put("/:tweetId", authenticateToken, updateTweet);
router.delete("/:tweetId", authenticateToken, deleteTweet);

module.exports = router;
