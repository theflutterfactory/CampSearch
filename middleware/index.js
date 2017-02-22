var middlewareObject = {};
var Campground = require("../models/campground");
var Comment = require("../models/comment");

middlewareObject.checkCampgroundOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id).then(function(foundCampground) {
            if(foundCampground.author.id.equals(req.user._id)) {
                next(); 
            } else {
                res.redirect("back");
            }
        }).catch(function(err) {
            console.log(err);
            res.redirect("back");
        });
    } else {
        res.redirect("back");
    }
}

middlewareObject.checkCommentOwnerShip = function(req, res, next) {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id).then(function(foundComment) {
            if(foundComment.author.id.equals(req.user._id)) {
                next(); 
            } else {
                res.redirect("back");
            }
        }).catch(function(err) {
            console.log(err);
            res.redirect("back");
        });
    } else {
        res.redirect("back");
    }
}

middlewareObject.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } 
    
    res.redirect("/login");
}


module.exports = middlewareObject;