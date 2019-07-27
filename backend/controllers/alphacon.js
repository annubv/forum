const posts = require("../database/models/posts");

const main = (req, res) => {
  const name = req.session.user.name;
  posts
    .find()
    .populate("posts")
    .exec((err, result) => {
      if (err) {
        console.log("Error Occured in showing homepage: " + err);
      } else {
        console.log("Post Result: " + result);
        return res.render("index", { name, forumdata: result });
      }
    });
};

const signup = (req, res) => {
  res.render("signup");
};

const signin = (req, res) => {
  res.render("signin");
};

module.exports = {
  main,
  signup,
  signin
};
