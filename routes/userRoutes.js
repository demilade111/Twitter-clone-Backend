const express = require("express");
const { authenticateToken } = require("../Middlewear/authMiddlewear");
const {
  followUser,
  unfollowUser,
  getUserFollowersAndFollowingCounts,
} = require("../controller/userController");
const router = express.Router();

router.put("/:id/follow", authenticateToken, followUser);
router.put("/:id/unfollow", isAuthenticated, unfollowUser);
router.get("/:username/profile", getProfile);
router.get("/:username/profile", getProfile);
router.get(
  "/users/:username/follow-stats",
  isAuthenticated,
  getUserFollowersAndFollowingCounts
);

module.exports = router;
