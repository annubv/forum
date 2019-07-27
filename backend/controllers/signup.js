const user = require("../database/models/user");
const signupuser = (req, res) => {
  const { name, email, password } = req.body;
  console.log({ name, email, password });
  var user_instance = new user({ name, email, password });
  user_instance.save(err => {
    if (err) {
      console.log("Error occured in creating user: " + err);
    } else {
      req.session.user = { email, name };
      console.log("User Added");
      return res.redirect("/");
    }
  });
};

module.exports = { signupuser };
