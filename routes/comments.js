var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

router.get('/new', isLoggedIn, function(req, res) {
    Campground.findById(req.params.id).then(function(campground) {
        res.render("comments/new", {campground: campground});
    }).catch(function(err) {
        console.log(err);
    });
});

router.post('/', isLoggedIn, function(req, res) {
    Campground.findById(req.params.id).then(function(campground) {
        Comment.create(req.body.comment).then(function(comment) {
            comment.author.id = req.user._id;
            comment.author.username = req.user.username;
            comment.save();
            
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

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } 
    
    res.redirect("/login");
}

module.exports = router;