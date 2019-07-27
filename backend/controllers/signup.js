const user = require("../database/models/user");
const signupuser = (req, res) => {
  const { name, email, password } = req.body;
  console.log({ name, email, password });
  var user_instance = new user({ name, email, password });
  user_instance.save(err => {
    if (err) {
      console.log("Error occured in creating user: " + err);
    } else {
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
    }
  });
};

module.exports = { signupuser };
