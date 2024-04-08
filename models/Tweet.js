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
exports.getAllTweets = async (req, res) => {
  try {
    const tweets = await Tweet.find().populate("author", "displayName");
    res.status(201).json(tweets);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch tweets", error: error.message });
  }
};
