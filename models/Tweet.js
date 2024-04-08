// models/Tweet.js
const mongoose = require("mongoose");

const TweetSchema = new mongoose.Schema({
  content: { type: String, required: true, maxlength: 280 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  image: { type: String }, // URL to the image, if applicable
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

module.exports = mongoose.model("Tweet", TweetSchema);
