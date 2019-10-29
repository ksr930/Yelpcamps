var mongoose = require("mongoose")
var car = require('./car')
var Campground = require('./campground');
var Comment = require('./comments')
var data =[{
    name:"cloud",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxUTasaOQcOVh_4PC1TlPdTkIHcKu8eIC5ZxqtV3AWEDKuZNOB",
    description: "loremLorem, ipsum m? At incidunt eotur, repellendus expedita officiis veniam adipisci?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio nihil, quaerat doloremque dolore asperiores rerum commodi officiis numquam? At incidunt eos eligendi vel odio tenetur, repellendus expedita officiis veniam adipisci?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio nihil, quaerat doloremque dolore asperiores rerum commodi officiis numquam? At incidunt eos eligendi vel odio tenetur, repellendus expedita officiis veniam adipisci?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio nihil, quaerat doloremque dolore asperiores rerum commodi officiis numquam? At incidunt eos eligendi vel odio tenetur, repellendus expedita officiis veniam adipisci?" 
    
    
},{
    name:"mountain",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTgJu1zeuGgKzN0CTcIIUhdbR2CiqMd-NaeDUYuyAzb9pPEEZ3j",
        description:"Lorem, ipsum ihil, quaerat doloremque dolore asperiores rerum commodi officiis numquam? At incidunt eos eligendi vel odio tenetur, repellendus expedita officiis veniam adipisci?"
}]

function seed() {
    //Remove all campgrounds
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, function (err) {
            if (err) {
                console.log(err);
            }
            console.log("removed comments!");
            //add a few campgrounds
            data.forEach(function (seed) {
                Campground.create(seed, function (err, campground) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                comment: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function (err, comment) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log(comment)
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    });}

module.exports = seed;
