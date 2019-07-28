var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var DislikesSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
  user_name: { type: String, ref: "user", required: true },
  user_email: { type: String, ref: "user", required: true },
  post_id: { type: Schema.Types.ObjectId, ref: "posts", required: true },
  data: { type: String, required: true }
});

module.exports = mongoose.model("comments", DislikesSchema);
