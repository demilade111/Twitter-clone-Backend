const tweet = require("../models/tweetModel");

const createTweet = async (req, res, next) => {
  const { content } = req.body;
  const { _id: userId } = req.user;
  try {
    const tweet = new Tweet({ content, author: userId });
    await tweet.save();
    res.status(201).json(tweet);
  } catch (error) {
    next(error);
  }
};

const getTweetsByUser = async (req, res, next) => {
  try {
    const userId = req.params.userId || req.user._id;
    const tweets = await tweet.find({ author: userId }).populate("author");
    if (tweets.length === 0) {
      return res
        .status(404)
        .json({ message: "No tweets found for the specified user." });
    }
    res.json(tweets);
  } catch (error) {
    next(error);
  }
};
const updateTweet = async (req, res, next) => {
  const { tweetId } = req.params;
  const { content } = req.body;
  try {
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }
    if (tweet.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this tweet" });
    }
    tweet.content = content;
    tweet.updatedAt = new Date();
    await tweet.save();
    res.json(tweet);
  } catch (error) {
    next(error);
  }
};

// controllers/tweetController.js
const searchTweets = async (req, res) => {
  const { q } = req.query; // Get the search q from query parameters

  if (!q) {
    return res.status(400).json({ message: "Please provide a tweet." });
  }

  try {
    // Perform a text search on the content field
    const tweets = await Tweet.find({ $text: { $search: q } }).populate(
      "author",
      "displayName username"
    );
    if (tweets.length === 0) {
      return res
        .status(404)
        .json({ message: "No tweets found matching your search criteria." });
    }
    res.json(tweets);
  } catch (error) {
    console.error(`Error searching tweets: ${error.message}`);
    res
      .status(500)
      .json({ message: "Error performing search", error: error.message });
  }
};

const deleteTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.tweetId);
    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }
    if (tweet.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this tweet" });
    }
    await tweet.remove();
    res.json({ message: "Tweet deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete tweet", error: error.message });
  }
};

module.exports = {
  createTweet,
  getTweetsByUser,
  updateTweet,
  deleteTweet,
  searchTweets,
};
