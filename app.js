var express =require("express")
var app= express()
var mongoose = require("mongoose")
var campground = require("./modules/campground")
var comment = require("./modules/comments")
var car = require("./modules/car")
var seed = require('./modules/seed')
var flash=require("connect-flash")
var commentRoutes =require("./routes/comments");
var camproundRoutes = require("./routes/campground")
var authRoutes = require("./routes/index")
var methodoverride = require("method-override")
var passport = require('passport')
LocalStrategy = require('passport-local')
passportLocalMongoose = require("passport-local-mongoose");
User = require("./modules/user")

app.use(flash());
app.use(methodoverride("_method"))
// seed()
// var comment = require("./modules/comments");
// var users = require("./modules/users");
// const uri =
//   "mongodb+srv://Karan:jGkwRahfbQKPU9lJ@cluster0-tw9nf.mongodb.net/test?retryWrites=true&w=majority";

// mongoose
//   .connect(uri, { dbName: "yelpcamp" })
//   .then(() => {
//     console.log("connected");
//   })
//   .catch(err => {
//     console.log(err);
// //   });
// const uri ="mongodb+srv://karan:Karan@123@cluster0-rcsub.mongodb.net/test?retryWrites=true&w=majority"


var uri =process.env.MONGODB_USER||'mongodb+srv://ksr:zTdSVqDv7DdCrsBg@cluster0-rcsub.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(uri)


app.use(require('express-session')({
    secret: "ksr",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var bodyparser=require("body-parser")

 app.use(bodyparser.urlencoded({extended:true}));

app.set("view engine","ejs")

app.use(express.static(__dirname+"/public"))
//schema setup
app.use(function (req,res,next) {
    res.locals.currentUser = req.user;
    res.locals.error=req.flash("error")
    res.locals.success = req.flash("success")
    next();
    
})



app.use(authRoutes);
app.use("/campground",camproundRoutes);
app.use(commentRoutes);

function isloggedin(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
const port = process.env.PORT||3000;
app.listen(port, process.env.IP, function() {
  console.log("server run");
});

