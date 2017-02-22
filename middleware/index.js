var middlewareObject = {};
var Campground = require("../models/campground");
var Comment = require("../models/comment");

middlewareObject.checkCampgroundOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id).then(function(foundCampground) {
            if(foundCampground.author.id.equals(req.user._id)) {
                next(); 
            } else {
                req.flash("error", "You don't have permission to do that!");
                res.redirect("back");
            }
        }).catch(function(err) {
            console.log(err);
            req.flash("error", "Campground not found");
            res.redirect("back");
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

middlewareObject.checkCommentOwnerShip = function(req, res, next) {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id).then(function(foundComment) {
            if(foundComment.author.id.equals(req.user._id)) {
                next(); 
            } else {
                req.flash("error", "You don't have permission to do that!");
                res.redirect("back");
            }
        }).catch(function(err) {
            console.log(err);
            req.flash("error", "Comment not found");
            res.redirect("back");
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

middlewareObject.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } 
    
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
}


module.exports = middlewareObject;