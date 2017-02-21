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

router.get('/:comment_id/edit', function(req, res) {
    Comment.findById(req.params.comment_id).then(function(foundComment) {
        res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
    }).catch(function(err) {
        console.log(err);
        res.redirect("back");
    });
});

router.put('/:comment_id', function(req, res) {
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment).then(function(updatedComment) {
       res.redirect("/campgrounds/" + req.params.id);
   }).catch(function(err) {
        console.log(err);
        res.redirect("back");
   });
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } 
    
    res.redirect("/login");
}

module.exports = router;