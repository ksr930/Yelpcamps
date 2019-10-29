
var express = require("express");
var router = express.Router();
var passport = require("passport")
var User = require("../modules/user")

router.get("/", function (req, res) {
    res.render("campground/landing")

})

router.get("/register", function (req, res) {
    res.render("auth/register", { currentUser: req.user });
})

 router.post('/register', function (req, res) {
    User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
        if (err) {

            req.flash("error",err.message)
            return res.render('auth/register');
        }
        passport.authenticate('local')(req, res, function () {
            req.flash("success","WELCOME TO YELPCAMP "+user.username)
            res.redirect('/campground')
        })

    })
});


router.get('/login', function (req, res) {
    res.render("auth/login")
})


router.post('/login', passport.authenticate("local", {
    successRedirect: "/campground",
    failureRedirect: "/login"
}), function (req, res) {

})

router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success","YOU LOGGED OUT")
    res.redirect('/campground')
})



module.exports=router;