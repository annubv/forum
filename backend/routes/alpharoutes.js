const express = require("express");
const alphacon = require("../controllers/alphacon");
const middle = require("../controllers/middle");
const signin = require("../controllers/signin");
const signup = require("../controllers/signup");

const router = express.Router();

router.route("/").get(middle.redirectsignin, alphacon.main);
router.route("/signin").get(middle.redirectprofile, alphacon.signin);
router.route("/signup").get(middle.redirectprofile, alphacon.signup);
router.route("/signin").post(signin.signinuser);
router.route("/signup").post(signup.signupuser);
router.route("/signout").get(middle.redirectsignin, signin.signout);

module.exports = router;
