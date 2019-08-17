var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profileimage: {
    id: { type: String, default: "1" },
    url: { type: String, default: "profileimages/defimg.jpg" }
  },
  likes: [
    {
      pid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts"
      }
    }
  ],
  dislikes: [
    {
      pid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts"
      }
    }
  ]
});

module.exports = mongoose.model("user", UserSchema);
