const user = require("../database/models/user");
const posts = require("../database/models/posts");
const comments = require("../database/models/comments");

const addforumpage = (req, res) => {
  const name = req.session.user.name;
  res.render("addforum", { name });
};

const addforum = (req, res) => {
  const { data } = req.body;
  var posts_instance = new posts({
    user_id: req.session.user.id,
    user_name: req.session.user.name,
    user_email: req.session.user.email,
    data
  });
  posts_instance.save(err => {
    if (err) {
      console.log("Error occured in adding forum : " + err);
    } else {
      console.log("Forum added! :)");
      return res.redirect("/");
    }
  });
};

const forumdata = (req, res) => {
  const { pid } = req.body;
  console.log("Incoming pid: " + pid);
  posts
    .findOne()
    .where("_id")
    .equals(pid)
    .populate("posts")
    .exec((err, postsresult) => {
      if (err) {
        console.log("Error occured in fetching post: " + err);
      } else {
        console.log("Posts result: " + postsresult);
        comments
          .find()
          .where("post_id")
          .equals(pid)
          .populate("comments")
          .exec((err, commentsresult) => {
            if (err) {
              console.log("Error occured in fetching comments: " + err);
            } else {
              console.log("Comments: " + commentsresult);
              req.session.post = { pid, data: postsresult };
              console.log(req.session);
              return res.render("forumdata", {
                name: req.session.user.name,
                pid: pid,
                postdata: postsresult,
                comments: commentsresult
              });
            }
          });
      }
    });
};

const addcomment = (req, res) => {
  const { comdata } = req.body;
  console.log("Comment to be added: " + comdata);
  var comments_instance = new comments({
    user_id: req.session.user.id,
    user_name: req.session.user.name,
    user_email: req.session.user.email,
    post_id: req.session.post.pid,
    data: comdata
  });
  comments_instance.save(err => {
    if (err) {
      console.log("Error occured in adding comment: " + err);
    } else {
      comments
        .find()
        .where("post_id")
        .equals(req.session.post.pid)
        .populate("comments")
        .exec((err, commentsresult) => {
          if (err) {
            console.log("Error occured in fetching comments: " + err);
          } else {
            console.log("Comments: " + commentsresult);
            console.log(
              "The details: ",
              req.session.user.name,
              req.session.post.pid,
              req.session.post.data,
              commentsresult
            );
            return res.render("forumdata", {
              name: req.session.user.name,
              pid: req.session.post.pid,
              postdata: req.session.post.data,
              comments: commentsresult
            });
          }
        });
    }
  });
};

module.exports = { addforumpage, addforum, forumdata, addcomment };
