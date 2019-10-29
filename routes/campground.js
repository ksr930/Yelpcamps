var express = require("express")
var router = express.Router();
var middleware=require("../middleware/index")
var campground = require("../modules/campground")



router.get("/", function (req, res) {
    campground.find({}, function (err, allcampgrounds) {
        if (err) {
            console.log("error")
        }
        else {

            res.render("campground/index", { campground: allcampgrounds, currentUser: req.user });

        }
    })
    //
})

router.post("/",middleware.isloggedin, function (req, res) {
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var author={
        id:req.user._id,
        username:req.user.username
    }
    var description = req.body.description;
    var insert = { name: name, image: image, price:price,description: description ,author:author}
    
    campground.create(insert, function (err, newly) {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect("/campground");
        }
    })

})

router.get("/new",middleware.isloggedin,function (req, res) {
    res.render("campground/new", { currentUser: req.user })

})
router.get("/delete/:id", function (req, res) {
    campground.findById(req.params.id, function (err, g) {
        g.remove()
        res.redirect('/campground')
    })
})
router.get("/:id", function (req, res) {

    campground.findById(req.params.id).populate('comments').exec(function (err, f) {
        if (err) {
            console.log(err)
        }
        else {
            res.render("campground/show", { campground: f, currentUser: req.user })
        }
    })


})


router.get("/:id/edit",middleware.checkcampgroundownership,function(req,res){
    
        campground.findById(req.params.id, function (err, foundcampground) {
            if(err)
            {
                req.flash("not found")
            }      
            res.render("campground/edit", { campground: foundcampground })
                         
            })
    
})

router.put("/:id",middleware.checkcampgroundownership,function(req,res){
    
campground.findByIdAndUpdate(req.params.id,req.body.camp,function(err,updatedata){
if(err)
res.redirect("/campground")
else{
res.redirect("/campground/"+req.params.id);
}
})
})

router.delete("/:id",middleware.checkcampgroundownership,function(req,res){
    campground.findByIdAndRemove(req.params.id,function(err,del){
        if(err)
        console.log(err)
        else{
           res.redirect('/campground');
        }
    })
})



module.exports = router;
//============
//comment
 