var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

router.get('/', function(req, res) {
    res.render("landing");
});

router.get('/register', function(req, res) {
    res.render("register");
});

router.post('/register', function(req, res) {
    var newUser = new User({ username: req.body.username });
    
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Hello " + user.username + ". Welcome to YelpCamp!");
            res.redirect("/campgrounds");  
        });
    });
});

router.get('/login', function(req, res) {
    res.render("login");
});

router.post('/login', passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login",
        failureFlash: true,
    }), function(req, res) {
});

router.get('/logout', function(req, res) {
    req.logout();
    req.flash("success", "Logged You out!");
    res.redirect("/campgrounds"); 
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } 
    
    res.redirect("/login");
}

module.exports = router;