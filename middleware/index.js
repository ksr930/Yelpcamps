var comment = require("../modules/comments");
var campground = require("../modules/campground")
var middlewareobj ={}

middlewareobj.checkcampgroundownership = function(req, res, next) {
    if (req.isAuthenticated()) {
        campground.findById(req.params.id, function (err, foundcampground) {
            if (err) {
                req.flash("error","NOT FOUND")
                res.redirect('back');
            }
            else {
                if (foundcampground.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    req.flash("error","PERMISSION DENIED")
                    res.redirect("back");
                }

            }
        })
    }
    else {
        req.flash("error", "YOU NEED TO BE LOGIN")
        res.redirect("back")
    }
}
middlewareobj.checkcommentownership = function(req, res, next) {
    if (req.isAuthenticated()) {
        comment.findById(req.params.comment_id, function (err, foundcomment) {
            if (err) {
                res.redirect('back');
            }
            else {
                if (foundcomment.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    req.flash("error","YOU DON'T HAVE PERMISSION TO DO THAT")
                    res.redirect("back");
                }

            }
        })
    }
    else {
        req.flash("error","YOU NEED TO BE LOG IN")
        res.redirect("back")
    }
}

middlewareobj.isloggedin=function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error","YOU NEED TO BE LOGIN")
    res.redirect("/login");
}

module.exports= middlewareobj