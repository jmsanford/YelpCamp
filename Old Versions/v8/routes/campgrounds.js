var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// INDEX ROUTE
router.get("/", function(req, res){
  //get userID
  
  // Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds:allCampgrounds});
    }
  });
});

//CREATE add new campground to DB
router.post("/", isLoggedIn, function(req, res){
  //get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var newCampground = {name: name, image: image, description: desc, author:author};
  //Create a new campground and save to database
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
      console.log(err);
    } else{
      console.log(newlyCreated);
      res.redirect("/campgrounds");
    }
  });
});

// NEW ROUTE
router.get("/new", isLoggedIn, function(req, res){
  res.render("campgrounds/new");
});

// SHOW ROUTE
router.get("/:id", function(req, res){
  //find campground with provided id
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      console.log(foundCampground);
      //render show template for that campground
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});


//MIDDLEWARE
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
