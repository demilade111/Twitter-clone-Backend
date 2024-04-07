const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/jwtUtils");

const googleCallback = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    if (!user.username) {
      // Generate a temporary token for username setup
      const tempToken = generateToken(user._id, "1h");
      return res.redirect(`/setup-username?token=${tempToken}`);
    }

    // Generate a regular token for authenticated users
    const token = generateToken(user._id);
    res.json({ token });
  } catch (error) {
    console.error("Error in Google callback:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const setupUsername = async (req, res) => {
  try {
    const { username } = req.body;
    const userId = req.user._id;

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: "Username already taken" });
    }

    // Update the user's username
    await User.findByIdAndUpdate(userId, { username });

    // Generate a regular token for the user
    const token = generateToken(userId);
    res.json({ token });
  } catch (error) {
    console.error("Error in setting up username:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  googleCallback,
  setupUsername,
};
