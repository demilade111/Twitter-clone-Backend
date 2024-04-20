const User = require("../models/userModel");

async function followUser(req, res) {
  if (req.params.id === req.user._id.toString()) {
    return res.status(400).send("You cannot follow yourself.");
  }

  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!userToFollow) {
      return res.status(404).send("User to follow not found.");
    }

    if (!userToFollow.followers.includes(req.user._id)) {
      await userToFollow.updateOne({ $push: { followers: req.user._id } });
      await currentUser.updateOne({ $push: { following: req.params.id } });
      res.status(200).send("User followed.");
    } else {
      res.status(403).send("You already follow this user.");
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error following user", error: error.message });
  }
}
async function unfollowUser(req, res) {
  if (req.params.id === req.user._id.toString()) {
    return res.status(400).send("You cannot unfollow yourself.");
  }

  try {
    const userToUnfollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!userToUnfollow) {
      return res.status(404).send("User to unfollow not found.");
    }

    if (userToUnfollow.followers.includes(req.user._id)) {
      await userToUnfollow.updateOne({ $pull: { followers: req.user._id } });
      await currentUser.updateOne({ $pull: { following: req.params.id } });
      res.status(200).send("User unfollowed.");
    } else {
      res.status(403).send("You do not follow this user.");
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error unfollowing user", error: error.message });
  }
}
async function getProfile(req, res) {
  try {
    const user = await User.findOne({ displayName: req.params.username })
      .populate("followers", "displayName")
      .populate("following", "displayName");

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const profile = {
      followersCount: user.followers.length,
      followingCount: user.following.length,
      followers: user.followers,
      following: user.following,
    };

    res.status(200).json(profile);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error fetching profile", error: error.message });
  }
}
const getUserFollowersAndFollowingCounts = async (req, res) => {
  const user = await User.findOne({ displayName: req.params.username });
  const followersCount = await UserRelation.countDocuments({
    following: user._id,
  });
  const followingCount = await UserRelation.countDocuments({
    follower: user._id,
  });

  const profileInfo = {
    followersCount,
    followingCount,
  };

  res.status(200).json(profileInfo);
};
module.exports = {
  followUser,
  unfollowUser,
  getProfile,
  getUserFollowersAndFollowingCounts,
};
