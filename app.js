var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgroundSchema = new mongoose.Schema({
    name: {type: String, default: "No name"},
    image: {type: String, default: 'http://www.iff.co.il/wp-content/uploads/thumbs/placeholder-31xgmtgz24pcdnis2ltc7e.png'},
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

app.get('/', function(req, res) {
    res.render("landing");
});

app.get('/campgrounds', function(req, res) {
    Campground.find({}).then(function(savedCampgrounds) {
        res.render("campgrounds", {campgrounds:savedCampgrounds});
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
   res.render("new"); 
});

app.get('/campgrounds/:id', function(req, res) {
    Campground.findById(req.params.id).then(function(foundCampground) {
        res.render("show", {campground: foundCampground});
    }).catch(function(err) {
        console.log(err);
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp server started");
});