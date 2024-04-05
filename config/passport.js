const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const Passport = require("passport");

module.exports = function (passport) {
  Passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("profile: ", profile);
        // Check for existing user
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }

        // If new user, create user in our database
        const newUser = await User.create({
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          pictures: profile.photos[0].value,
        });

        done(null, newUser);
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};
