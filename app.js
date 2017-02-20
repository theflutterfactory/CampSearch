var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var Campground = require("./models/campground")
var Comment = require("./models/comment");
var seedDB = require("./seeds");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");

mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://localhost/yelp_camp");

seedDB();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res) {
    res.render("landing");
});

app.get('/campgrounds', function(req, res) {
    Campground.find({}).then(function(savedCampgrounds) {
        res.render("campgrounds/index", {campgrounds:savedCampgrounds});
    }).catch(function(err) {
        console.log(err);
    });
});

app.post('/campgrounds', function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    
    var newCampground = {name:name, image:image, description: description};
    Campground.create(newCampground).then(function(campground) {
        res.redirect("/campgrounds");
    }).catch(function(err){
        console.log(err);
    });
});

app.get('/campgrounds/new', function(req, res) {
   res.render("campgrounds/new"); 
});

app.get('/campgrounds/:id', function(req, res) {
    var promise = Campground.findById(req.params.id).populate("comments").exec();
    
    promise.then(function(foundCampground) {
        console.log(foundCampground);
        res.render("campgrounds/show", {campground: foundCampground});
    }).catch(function(err) {
        console.log(err);
    });
});

app.get('/campgrounds/:id/comments/new', function(req, res) {
    Campground.findById(req.params.id).then(function(campground) {
        res.render("comments/new", {campground: campground});
    }).catch(function(err) {
        console.log(err);
    });
});

app.post('/campgrounds/:id/comments', function(req, res) {
    Campground.findById(req.params.id).then(function(campground) {
        Comment.create(req.body.comment).then(function(comment) {
            campground.comments.push(comment);
            campground.save();
            res.redirect('/campgrounds/' + campground._id);
        }).catch(function(err) {
            console.log(err);
        });
    }).catch(function(err) {
        res.redirect('/campgrounds');
        console.log(err);
    });
});
    
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp server started");
});