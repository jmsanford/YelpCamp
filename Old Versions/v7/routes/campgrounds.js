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
      res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser: req.user});
    }
  });
});

router.post("/", function(req, res){
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

// NEW ROUTE
router.get("/new", function(req,res){
  res.render("campgrounds/new");
});

// SHOW ROUTE
router.get("/:id", function(req,res){
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

module.exports = router;
