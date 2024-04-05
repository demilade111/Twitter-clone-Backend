const mongoose = require("mongoose");
const DatabaseConnection = () => {
  const db = mongoose.connect(
    "mongodb+srv://demiladealuko111:3ODbElcujRWxGxYe@cluster0.saxttrn.mongodb.net/Twitter-clone?retryWrites=true&w=majority&ssl=true",
    {
      serverSelectionTimeoutMS: 30000,
      ssl: true,
    }
  );
  if (db) {
    console.log("Database connected successfully");
  } else {
    console.log("Database connection failed");
  }
};
module.exports = { DatabaseConnection };
