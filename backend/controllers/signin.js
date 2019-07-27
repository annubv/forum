const user = require("../database/models/user");
const signinuser = (req, res) => {
  const { email, password } = req.body;
  console.log({ email, password });
  user
    .findOne()
    .where("email")
    .equals(email)
    .where("password")
    .equals(password)
    .populate("user")
    .exec((err, auth) => {
      if (err) {
        console.log("Error occured in signing in: " + err);
      } else {
        console.log(auth);
        req.session.user = { id: auth._id, name: auth.name, email };
        return res.redirect("/");
      }
    });
};

const signout = (req, res) => {
  req.session.destroy(() => {
    console.log("Error occured");
  });
  res.redirect("/");
};

module.exports = { signinuser, signout };
