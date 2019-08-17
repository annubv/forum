const express = require("express");
const alphacon = require("../controllers/alphacon");
const middle = require("../controllers/middle");
const signin = require("../controllers/signin");
const signup = require("../controllers/signup");
const forum = require("../controllers/forum");
const profile = require("../controllers/profile");

const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

const router = express.Router();

/* Cloudinary configuration */

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "chorusprofiles",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
});

const parser = multer({ storage: storage });

router.route("/").get(middle.redirectsignin, alphacon.main);
router.route("/signin").get(middle.redirectprofile, alphacon.signin);
router.route("/signup").get(middle.redirectprofile, alphacon.signup);
router.route("/signout").get(middle.redirectsignin, signin.signout);
router.route("/addforum").get(middle.redirectsignin, forum.addforumpage);
router.route("/profile").get(middle.redirectsignin, profile.mainpage);
router.route("/comment").get(forum.forumdata);

router.route("/signin").post(signin.signinuser);
router.route("/signup").post(signup.signupuser);
router.route("/addforum").post(forum.addforum);
router.route("/comment").post(forum.addcomment);
router.route("/like").post(forum.like);
router.route("/dislike").post(forum.dislike);
router.route("/dp").post(parser.single("image"), profile.imgupload);

module.exports = router;
