require("dotenv").config();
const express = require("express");
const passport = require("passport");
require("./config/passport")(passport);
const app = express();
const cors = require("cors");
const { DatabaseConnection } = require("./config/db");
const session = require("express-session");
const errorHandler = require("./Middlewear/errorHandle");
const authRoute = require("./routes/authRoutes");

DatabaseConnection();
app.use(cors());
// Parse incoming request bodies in JSON format
app.use(express.json());
// Parse incoming request bodies in URL-encoded format
app.use(express.urlencoded({ extended: true }));
// Sessions middleware
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoute);

app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
