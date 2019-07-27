const mongoose = require("mongoose");
var mongoDB = "mongodb://localhost:27017/forumdb";

mongoose.connect(
  mongoDB,
  {
    useNewUrlParser: true
  },
  err => {
    if (!err) {
      console.log("DB Connection successful");
    } else {
      console.log("Error Occured: " + err);
    }
  }
);

var db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
