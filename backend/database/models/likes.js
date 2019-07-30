var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var LikesSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
  post_id: { type: Schema.Types.ObjectId, ref: "posts", required: true }
});

module.exports = mongoose.model("likes", LikesSchema);
