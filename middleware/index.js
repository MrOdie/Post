// all middleware
var middlewareObj   = {},
    Campground      = require("../models/campground"),
    Comment         = require("../models/comment");
    // flash           = require("connect-flash");

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err) {
                req.flash("error", "Campground not found.");
                res.redirect("back");
            } else {
                // Does user own the campground?
                    //foundCampground.author.id is not the same as: 
                        //req.user._id
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that.");
                    res.redirect("back");
                }
                
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back");
    }
} 

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err) {
                //console.log(err);
                res.redirect("back");
            } else {
                // Does user own the comment?
                    //foundCampground.author.id is not the same as: 
                        //req.user._id
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
                
            }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that.");
    res.redirect("/login");
};


module.exports = middlewareObj;