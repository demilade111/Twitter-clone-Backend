// controllers/tweetController.js
const Tweet = require("../models/Tweet");

exports.createTweet = async (req, res) => {
  const { content } = req.body;
  const userId = req.user._id;
  try {
    const tweet = new Tweet({
      content,
      author: userId,
    });
    await tweet.save();
    res.status(201).json(tweet);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create tweet", error: error.message });
  }
};

exports.getTweetsByUser = async (req, res) => {
  try {
    // Assuming req.params.userId holds the ID of the user whose tweets we want to fetch
    const userId = req.params.userId || req.user._id; // Fallback to authenticated user's ID if none is provided
    const tweets = await Tweet.find({ author: userId }).populate("author");

    if (tweets.length === 0) {
      return res
        .status(404)
        .json({ message: "No tweets found for the specified user." });
    }

    res.json(tweets);
  } catch (error) {
    console.error(
      `Error fetching tweets by user ${req.params.userId}: ${error.message}`
    );
    res
      .status(500)
      .json({ message: "Error fetching tweets", error: error.message });
  }
};
exports.updateTweet = async (req, res) => {
  const { tweetId } = req.params; // Get tweetId from URL params
  const { content } = req.body; // Continue to get the content from the request body

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
    res
      .status(500)
      .json({ message: "Failed to update tweet", error: error.message });
  }
};

exports.deleteTweet = async (req, res) => {
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
