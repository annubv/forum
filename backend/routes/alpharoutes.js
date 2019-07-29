const express = require("express");
const alphacon = require("../controllers/alphacon");
const middle = require("../controllers/middle");
const signin = require("../controllers/signin");
const signup = require("../controllers/signup");
const forum = require("../controllers/forum");

const router = express.Router();

router.route("/").get(middle.redirectsignin, alphacon.main);
router.route("/signin").get(middle.redirectprofile, alphacon.signin);
router.route("/signup").get(middle.redirectprofile, alphacon.signup);
router.route("/signout").get(middle.redirectsignin, signin.signout);
router.route("/addforum").get(middle.redirectsignin, forum.addforumpage);
router.route("/comment").get(forum.forumdata);

router.route("/signin").post(signin.signinuser);
router.route("/signup").post(signup.signupuser);
router.route("/addforum").post(forum.addforum);
router.route("/comment").post(forum.addcomment);

module.exports = router;
