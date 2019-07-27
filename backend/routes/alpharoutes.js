const express = require("express");
const alphacon = require("../controllers/alphacon");
const middle = require("../controllers/middle");

const router = express.Router();

router.route("/").get(middle.redirectsignin, alphacon.main);
router.route("/signin").get(middle.redirectprofile, alphacon.signin);
router.route("/signup").get(middle.redirectprofile, alphacon.signup);

module.exports = router;
