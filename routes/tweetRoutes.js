// routes/tweetRoutes.js
const express = require("express");
const {
  createTweet,
  getAllTweets,
  updateTweet,
  deleteTweet,
} = require("../controllers/tweetController");
const { isAuthenticated } = require("../middleware/authMiddleware");
const { getTweetsByUser } = require("../controller/tweetController");

const router = express.Router();

router.post("/", isAuthenticated, createTweet);
router.get("/", isAuthenticated, getAllTweets);
router.put("/", isAuthenticated, updateTweet);
router.get("/:userId", isAuthenticated, getTweetsByUser);
router.put("/:tweetId", isAuthenticated, updateTweet);

router.delete("/:tweetId", isAuthenticated, deleteTweet);

module.exports = router;
