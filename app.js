/* Required Modules */

const express = require("express");
const bp = require("body-parser");
const compress = require("compression");
const logger = require("morgan");
const cors = require("cors");
const ejs = require("ejs");
const session = require("express-session");
require("dotenv").config();

/* Routes directory */

const alpharoutes = require(__dirname + "/backend/routes/alpharoutes");

const router = express.Router();
const app = express();

/* MongoDB Configuration */

var mongoose = require("mongoose");
var mongoDB =
  "mongodb+srv://root0:root0pass@cluster0-cpolg.mongodb.net/forum_db?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.set("useFindAndModify", false);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

/* Required Middlewares */

app.use(express.static(__dirname + "/client/css"));
app.use(express.static(__dirname + "/client/assets"));
app.use(cors());
app.use(compress());
app.use(logger("dev"));
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(logger("dev"));
app.use(
  session({
    name: "sid",
    resave: false,
    saveUninitialized: false,
    secret: "afsfw123dsa",
    cookie: { maxAge: 99999999999, sameSite: true }
  })
);
app.use("/", alpharoutes);
app.engine("html", ejs.renderFile);
app.set("views", __dirname + "/client/views");
app.set("view engine", "ejs");

/* Port Configuration */

app.set("port", process.env.PORT || 8800);

app.listen(app.get("port"), () => {
  console.log("App running on port" + app.get("port"));
});
