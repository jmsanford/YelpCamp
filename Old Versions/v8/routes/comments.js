var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//COMMENTS NEW
router.get("/new", isLoggedIn, function(req,res){
  //  FIND CAMPGROUND BY ID
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});
    }
  })
});

//COMMENTS CREATE
router.post("/", isLoggedIn, function(req, res){
  //LOOKUP CAMPGROUND USING ID
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      // CREATE NEW COMMENT
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err);
        } else {
            //Add username and id to comment
            comment.author.id = req.user._id;
            comment.author.username = req.user.username;
            //save comment
            comment.save();
            //CONNECT NEW COMMENT TO CAMPGROUND
            campground.comments.push(comment._id);
            campground.save();
            //REDIRECT TO SHOW PAGE
            res.redirect('/campgrounds/' + campground._id);
        }
      });
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