var mongoose = require("mongoose")

var carschema = new mongoose.Schema({
    name: String,
    image: String,
    speed: Number,
    description: String
})
module.exports= mongoose.model("car", carschema);
