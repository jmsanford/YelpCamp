var express = require("express");
var app = express();
var bodyParser= require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

 var campgrounds = [
    {name: "salmon Creek", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=2550&q=80"},
    {name: "MEOW GROUNDS", image: "https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?auto=format&fit=crop&w=1350&q=80"},
    {name: "beaut", image: "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?auto=format&fit=crop&w=1350&q=80"},{name: "salmon Creek", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=2550&q=80"},
    {name: "MEOW GROUNDS", image: "https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?auto=format&fit=crop&w=1350&q=80"},
    {name: "beaut", image: "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?auto=format&fit=crop&w=1350&q=80"},{name: "salmon Creek", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=2550&q=80"},
    {name: "MEOW GROUNDS", image: "https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?auto=format&fit=crop&w=1350&q=80"},
    {name: "beaut", image: "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?auto=format&fit=crop&w=1350&q=80"},{name: "salmon Creek", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=2550&q=80"},
    {name: "MEOW GROUNDS", image: "https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?auto=format&fit=crop&w=1350&q=80"},
    {name: "beaut", image: "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?auto=format&fit=crop&w=1350&q=80"}
  ];

app.get("/", function(req, res){
  res.render("landing");
});

app.get("/campgrounds", function(req, res){
  res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
  //get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
  campgrounds.push(newCampground);
  //redirect back to the campgrounds page
  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req,res){
  res.render("new.ejs");
});

app.listen(3000, function(){
  console.log("Yelpcamp server has started");
});