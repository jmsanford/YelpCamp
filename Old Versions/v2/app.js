var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp")
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//       {name: "MEOW GROUNDS", image: "https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?auto=format&fit=crop&w=1350&q=80",
//       description: "This is a huge meow grounds with no bathrooms. Just awesome cats."}
// , function(err, campground){
//     if(err){
//       console.log(err);
//     } else {
//       console.log("NEWLY CREATED CAMPGROUND:");
//       console.log(campground);
//     }
//   });

//  var campgrounds = [
//     {name: "salmon Creek", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=2550&q=80"},
//     {name: "MEOW GROUNDS", image: "https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?auto=format&fit=crop&w=1350&q=80"},
//     {name: "beaut", image: "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?auto=format&fit=crop&w=1350&q=80"},{name: "salmon Creek", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=2550&q=80"},
//     {name: "MEOW GROUNDS", image: "https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?auto=format&fit=crop&w=1350&q=80"},
//     {name: "beaut", image: "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?auto=format&fit=crop&w=1350&q=80"},{name: "salmon Creek", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=2550&q=80"},
//     {name: "MEOW GROUNDS", image: "https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?auto=format&fit=crop&w=1350&q=80"},
//     {name: "beaut", image: "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?auto=format&fit=crop&w=1350&q=80"},{name: "salmon Creek", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=2550&q=80"},
//     {name: "MEOW GROUNDS", image: "https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?auto=format&fit=crop&w=1350&q=80"},
//     {name: "beaut", image: "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?auto=format&fit=crop&w=1350&q=80"}
//   ];

app.get("/", function(req, res){
  res.render("landing");
});

app.get("/campgrounds", function(req, res){
  // Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    } else {
      res.render("index", {campgrounds:allCampgrounds});
    }
  });
});

app.post("/campgrounds", function(req, res){
  //get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc};
  //Create a new campground and save to database
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
      console.log(err);
    } else{
      res.redirect("/campgrounds")
    }
  });
});

app.get("/campgrounds/new", function(req,res){
  res.render("new");
});

app.get("/campgrounds/:id", function(req,res){
  //find campground with provided id
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      //render show template for that campground
      res.render("show", {campground: foundCampground});
    }
  });
  
});

app.listen(3000, function(){
  console.log("Yelpcamp server has started");
});