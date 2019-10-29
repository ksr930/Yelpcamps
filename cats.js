var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/catapp",{useNewUrlParser : true},(err)=>{
    if(!err){console.log("mongodb connected")}
    else{
        console.log("not connected")
    }
}

);
var catSchema= new mongoose.Schema({
name:String,
age:Number,
temperament:String

});

var cat= mongoose.model("cat",catSchema)

// var george = new cat({
//     name:"noris",
//     age:22,
//     temperament:"evil"

// });

// george.save(function(err,cat)
// {
//     if(err)
// {
//     console.log("error")
// }
// else{
//     console.log("save")
//     console.log(cat)
// }
// });

cat.create({
    name:"himanshuhhh",
    age:24,
    temperament:"ndkfd"
},function(err,cat){
    if(err){
        console.log(err)
    }
    else{
        console.log(cat)
    }
})



cat.find({},function(err,cats){
  if(err){
      console.log("error")
  }  
  else{
      console.log(
          "all cats"
      )
      console.log(cats);
  }
})




