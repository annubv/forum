const main = (req, res) => {
  res.render("signin");
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
