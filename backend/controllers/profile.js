const user = require("../database/models/user");

const mainpage = (req, res) => {
  user
    .findOne()
    .where("_id")
    .equals(req.session.user.id)
    .populate("user")
    .exec((err, current_user) => {
      if (err) {
        console.log("Error occured in signing in: " + err);
      } else {
        console.log("Current profile: ", current_user);
        const image_id = current_user.profileimage.id;
        const image_url = current_user.profileimage.url;
        res.render("profile", {
          image_url,
          image_id,
          name: req.session.user.name,
          email: req.session.user.email
        });
      }
    });
};

const imgupload = (req, res) => {
  console.log("The uploaded file is: ", req.file);
  const new_image = {};
  new_image.url = req.file.url;
  new_image.id = req.file.public_id;
  user.findOneAndUpdate(
    { _id: req.session.user.id },
    { profileimage: new_image },
    { upsert: true },
    (err, doc) => {
      if (err) return res.send(500, { error: err });
      res.redirect("profile");
    }
  );
};

module.exports = {
  mainpage,
  imgupload
};
