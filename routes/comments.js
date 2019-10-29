var express = require("express");
var router = express.Router();
var campground = require("../modules/campground")
var comment = require("../modules/comments")
var middleware=require("../middleware/index")


router.get("/campground/:id/comments/new", middleware.isloggedin, function (req, res) {
    campground.findById(req.params.id, function (err, campground) {
        if (err)
            console.log(err)
        else {
            res.render("comments/new", { campground: campground, currentUser: req.user })
        }
    })

})

router.post("/campground/:id/comments", middleware.isloggedin, function (req, res) {
    campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err)

            res.redirect("/campground")
        }
        else {
            comment.create(req.body.comment, function (err, comm) {
                if (err)
                {
                    console.log(err)
req.flash("error","something went wrong")
                }
                else {
                    comm.author.id=req.user._id;
                    comm.author.username = req.user.username;
                    comm.save();
                    campground.comments.push(comm);
                    campground.save();
                    req.flash("success","SUCCESSFULY ADDED COMMENT")
                    res.redirect("/campground/" + campground._id)
                }
            })
        }



    })
})

router.get("/campground/:id/comment/:comment_id/edit",middleware.checkcommentownership,function(req,res){
   comment.findById(req.params.comment_id,function(err,foundcomment){
       if(err)
       res.redirect("back")
       else{
           res.render("comments/edit", { campground_id: req.params.id ,comment:foundcomment})       
       }
   })
    
})

router.put("/campground/:id/comment/:comment_id",function(req,res){
    comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,suc){
        if(err)
        res.redirect("back")
        else{
          res.redirect("/campground/"+req.params.id)  
        }

    })
})

router.delete("/campground/:id/comment/:comment_id",middleware.checkcommentownership,function(req,res){
comment.findByIdAndRemove(req.params.comment_id,function(err,suc){
    if(err){
        res.redirect("back")

    }
    else{
        req.flash("success","COMMENT DELETED")
        res.redirect("/campground/"+req.params.id);
    }
})

})
function isloggedin(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}



module.exports =router;