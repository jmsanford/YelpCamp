var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    seedDB     = require("./seeds");

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp_v4")
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");



app.get("/", function(req, res){
  res.render("landing");
});

app.get("/campgrounds", function(req, res){
  // Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds:allCampgrounds});
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

// NEW ROUTE
app.get("/campgrounds/new", function(req,res){
  res.render("campgrounds/new");
});

// SHOW ROUTE
app.get("/campgrounds/:id", function(req,res){
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

// ===================================
// COMMENTS ROUTES
// ===================================

app.get("/campgrounds/:id/comments/new", function(req,res){
  //  FIND CAMPGROUND BY ID
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});
    }
  })
});


app.post("/campgrounds/:id/comments", function(req, res){
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
          //CONNECT NEW COMMENT TO CAMPGROUND
          campground.comments.push(comment);
          campground.save();
          //REDIRECT TO SHOW PAGE
          res.redirect("/campgrounds/" + campground._id);
        }
      })
    }
  })
});


app.listen(3000, function(){
  console.log("Yelpcamp server has started");
});