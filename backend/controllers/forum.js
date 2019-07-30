const user = require("../database/models/user");
const posts = require("../database/models/posts");
const comments = require("../database/models/comments");
const likes = require("../database/models/likes");
const dislikes = require("../database/models/dislikes");

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
      console.log("Forum added!");
      return res.redirect("/");
    }
  });
};

const forumdata = (req, res) => {
  const { pid } = req.query;
  if (pid) {
    req.session.post = { id: pid, data: null };
  }
  console.log("Incoming pid: " + req.session.post.id);
  posts
    .findOne()
    .where("_id")
    .equals(req.session.post.id)
    .populate("posts")
    .exec((err, postsresult) => {
      if (err) {
        console.log("Error occured in fetching post: " + err);
      } else {
        comments
          .find()
          .where("post_id")
          .equals(req.session.post.id)
          .populate("comments")
          .exec((err, commentsresult) => {
            if (err) {
              console.log("Error occured in fetching comments: " + err);
            } else {
              req.session.post.data = postsresult;
              return res.render("forumdata", {
                name: req.session.user.name,
                pid: req.session.post.id,
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
    post_id: req.session.post.id,
    data: comdata
  });
  comments_instance.save(err => {
    if (err) {
      console.log("Error occured in adding comment: " + err);
    } else {
      comments
        .find()
        .where("post_id")
        .equals(req.session.post.id)
        .populate("comments")
        .exec((err, commentsresult) => {
          if (err) {
            console.log("Error occured in fetching comments: " + err);
          } else {
            posts
              .findOneAndUpdate(
                { _id: req.session.post.id },
                { $inc: { comments: 1 } }
              )
              .then(() => {
                return res.redirect("/comment");
              });
          }
        });
    }
  });
};

const like = (req, res) => {
  const post_id = req.session.post.id;
  const user_id = req.session.user.id;
  likes
    .find()
    .where("user_id")
    .equals(req.session.user.id)
    .where("post_id")
    .equals(post_id)
    .populate("_id")
    .exec((err, likes_result) => {
      if (err) {
        console.log("Error Occured in fetching likes: " + err);
      } else {
        console.log("Likes result: " + likes_result);
        if (likes_result.length < 1) {
          console.log("Not liked, liking..");
          dislikes
            .find()
            .where("user_id")
            .equals(req.session.user.id)
            .where("post_id")
            .equals(post_id)
            .populate("_id")
            .exec((err, dislikes_result) => {
              if (err) {
                console.log("Error Occured in fetching dislikes: " + err);
              } else {
                if (dislikes_result.length < 1) {
                  console.log("Not disliked...");
                  var likes_instance = new likes({ post_id, user_id });
                  console.log("likes_instance: " + likes_instance);
                  likes_instance.save(err => {
                    if (err) {
                      console.log("Error occured in liking only: " + err);
                    } else {
                      posts
                        .findOneAndUpdate(
                          { _id: post_id },
                          { $inc: { likes: 1 } }
                        )
                        .then(() => {
                          return res.redirect("/comment");
                        });
                    }
                  });
                } else {
                  var likes_instance = new likes({ user_id, post_id });
                  likes_instance.save(err => {
                    if (err) {
                      console.log(
                        "Error occured in liking and disliking: " + err
                      );
                    } else {
                      dislikes
                        .findOneAndRemove({
                          user_id: req.session.user.id,
                          post_id: post_id
                        })
                        .then(() => {
                          posts
                            .findOneAndUpdate(
                              { _id: post_id },
                              { $inc: { likes: 1, dislikes: -1 } }
                            )
                            .then(() => {
                              return res.redirect("/comment");
                            });
                        });
                    }
                  });
                }
              }
            });
        } else {
          likes
            .findOneAndRemove({
              user_id: req.session.user.id,
              post_id: post_id
            })
            .then(() => {
              posts
                .findOneAndUpdate({ _id: post_id }, { $inc: { likes: -1 } })
                .then(() => {
                  return res.redirect("/comment");
                });
            });
        }
      }
    });
};

const dislike = (req, res) => {
  const post_id = req.session.post.id;
  const user_id = req.session.user.id;
  dislikes
    .find()
    .where("user_id")
    .equals(req.session.user.id)
    .where("post_id")
    .equals(post_id)
    .populate("_id")
    .exec((err, dislikes_result) => {
      if (err) {
        console.log("Error Occured in fetching dislikes: " + err);
      } else {
        console.log("Dislikes result: " + dislikes_result);
        if (dislikes_result.length < 1) {
          console.log("Not disliked, disliking..");
          likes
            .find()
            .where("user_id")
            .equals(req.session.user.id)
            .where("post_id")
            .equals(post_id)
            .populate("_id")
            .exec((err, likes_result) => {
              if (err) {
                console.log("Error Occured in fetching likes: " + err);
              } else {
                if (likes_result.length < 1) {
                  console.log("Not liked...");
                  var dislikes_instance = new dislikes({ post_id, user_id });
                  console.log("dislikes_instance: " + dislikes_instance);
                  dislikes_instance.save(err => {
                    if (err) {
                      console.log("Error occured in disliking only: " + err);
                    } else {
                      posts
                        .findOneAndUpdate(
                          { _id: post_id },
                          { $inc: { dislikes: 1 } }
                        )
                        .then(() => {
                          return res.redirect("/comment");
                        });
                    }
                  });
                } else {
                  var dislikes_instance = new dislikes({ user_id, post_id });
                  dislikes_instance.save(err => {
                    if (err) {
                      console.log(
                        "Error occured in disliking and deleting like: " + err
                      );
                    } else {
                      likes
                        .findOneAndRemove({
                          user_id: req.session.user.id,
                          post_id: post_id
                        })
                        .then(() => {
                          posts
                            .findOneAndUpdate(
                              { _id: post_id },
                              { $inc: { likes: -1, dislikes: 1 } }
                            )
                            .then(() => {
                              return res.redirect("/comment");
                            });
                        });
                    }
                  });
                }
              }
            });
        } else {
          dislikes
            .findOneAndRemove({
              user_id: req.session.user.id,
              post_id: post_id
            })
            .then(() => {
              posts
                .findOneAndUpdate({ _id: post_id }, { $inc: { dislikes: -1 } })
                .then(() => {
                  return res.redirect("/comment");
                });
            });
        }
      }
    });
};

module.exports = {
  addforumpage,
  addforum,
  forumdata,
  addcomment,
  like,
  dislike
};
