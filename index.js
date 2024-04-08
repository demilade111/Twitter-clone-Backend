const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");
const { DatabaseConnection } = require("./config/db");
const errorHandler = require("./Middlewear/errorHandle");
const authRoutes = require("./routes/authRoutes");

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Connect to the database
DatabaseConnection();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
require("./config/passport")(passport);

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

app.use("/auth", authRoutes);
app.use("/auth/username", (req, res) => {
  res.send("Input your username");
});
// Error handling middleware
app.use(errorHandler);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
