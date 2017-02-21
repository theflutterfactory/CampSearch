var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var Campground = require("./models/campground")
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");

var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

seedDB();

app.use(require("express-session")({
    secret: "Pikachu is highly overrated",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp server started");
});