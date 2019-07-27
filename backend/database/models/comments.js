var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user", required: true },
  post: { type: Schema.Types.ObjectId, ref: "posts", required: true },
  data: { type: String, required: true }
});

module.exports = mongoose.model("comments", CommentsSchema);
