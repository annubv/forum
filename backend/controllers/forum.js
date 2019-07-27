const user = require("../database/models/user");
const posts = require("../database/models/posts");

const addforumpage = (req, res) => {
  const name = req.session.user.name;
  res.render("addforum", { name });
};

const addforum = (req, res) => {
  const { data } = req.body;
  const id = req.session.user.id;
  console.log({ data, id });
  var posts_instance = new posts({ user: id, data });
  posts_instance.save(err => {
    if (err) {
      console.log("Error occured in adding forum : " + err);
    } else {
      console.log("Forum added! :)");
      return res.redirect("/");
    }
  });
};

module.exports = { addforumpage, addforum };
