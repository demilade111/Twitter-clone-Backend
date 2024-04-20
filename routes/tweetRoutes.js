const express = require("express");
const {
  getTweetsByUser,
  createTweet,
  updateTweet,
  deleteTweet,
  searchTweets,
} = require("../controller/tweetController");
const { authenticateToken } = require("../Middlewear/authMiddlewear");
const router = express.Router();

router.post("/create", authenticateToken, createTweet);
router.get("/search", searchTweets); // Search should come first
router.get("/:userId", getTweetsByUser);
router.put("/:tweetId", authenticateToken, updateTweet);
router.delete("/:tweetId", authenticateToken, deleteTweet);

module.exports = router;
