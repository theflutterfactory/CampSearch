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

app.get('/campgrounds/:id/comments/new', isLoggedIn, function(req, res) {
    Campground.findById(req.params.id).then(function(campground) {
        res.render("comments/new", {campground: campground});
    }).catch(function(err) {
        console.log(err);
    });
});

app.post('/campgrounds/:id/comments', isLoggedIn, function(req, res) {
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

app.get('/register', function(req, res) {
    res.render("register");
});

app.post('/register', function(req, res) {
    var newUser = new User({ username: req.body.username });
    
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            return res.render("register");
        }
        
        passport.authenticate("local")(req, res, function() {
            res.redirect("/campgrounds");  
        });
    });
});

app.get('/login', function(req, res) {
    res.render("login");
});

app.post('/login', passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
});

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect("/campgrounds"); 
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } 
    
    res.redirect("/login");
}
    
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp server started");
});