var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PostsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user", required: true },
  data: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 }
});

module.exports = mongoose.model("posts", PostsSchema);
