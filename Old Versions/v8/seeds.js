var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment");

var data = [
  {
    name: "Clouds Rest", 
    image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?dpr=2&auto=format&fit=crop&w=767&h=512&q=60&cs=tinysrgb",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur orci sem, sodales eget sem sit amet, imperdiet vulputate mauris. Sed maximus, purus non gravida laoreet, nisi nisi ullamcorper ex, ut interdum mi lorem a diam. Duis ut dui cursus, tincidunt augue sed, mattis felis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec fermentum pulvinar nisi, sed maximus lectus facilisis quis. Fusce pretium purus posuere, egestas enim id, cursus tellus. Mauris lacinia porttitor purus, in convallis elit dignissim a. Nunc porttitor diam a vulputate eleifend. Sed urna purus, tempor ut nulla eu, blandit sollicitudin erat. Phasellus blandit nibh ut egestas consectetur. Etiam sed rutrum ex. Mauris eget ipsum id elit cursus porttitor quis eu justo. Ut eu est dignissim mi dignissim consectetur. Mauris tincidunt ante eget posuere placerat. Nulla dictum interdum libero euismod euismod. Morbi porttitor egestas purus, sed gravida odio ultricies vitae."
  },
   {
    name: "Mesa Campground", 
    image:"https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?dpr=2&auto=format&fit=crop&w=767&h=511&q=60&cs=tinysrgb",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur orci sem, sodales eget sem sit amet, imperdiet vulputate mauris. Sed maximus, purus non gravida laoreet, nisi nisi ullamcorper ex, ut interdum mi lorem a diam. Duis ut dui cursus, tincidunt augue sed, mattis felis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec fermentum pulvinar nisi, sed maximus lectus facilisis quis. Fusce pretium purus posuere, egestas enim id, cursus tellus. Mauris lacinia porttitor purus, in convallis elit dignissim a. Nunc porttitor diam a vulputate eleifend. Sed urna purus, tempor ut nulla eu, blandit sollicitudin erat. Phasellus blandit nibh ut egestas consectetur. Etiam sed rutrum ex. Mauris eget ipsum id elit cursus porttitor quis eu justo. Ut eu est dignissim mi dignissim consectetur. Mauris tincidunt ante eget posuere placerat. Nulla dictum interdum libero euismod euismod. Morbi porttitor egestas purus, sed gravida odio ultricies vitae."
  },
   {
    name: "Canyon Campground", 
    image:"https://images.unsplash.com/photo-1475483768296-6163e08872a1?dpr=2&auto=format&fit=crop&w=767&h=511&q=60&cs=tinysrgb",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur orci sem, sodales eget sem sit amet, imperdiet vulputate mauris. Sed maximus, purus non gravida laoreet, nisi nisi ullamcorper ex, ut interdum mi lorem a diam. Duis ut dui cursus, tincidunt augue sed, mattis felis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec fermentum pulvinar nisi, sed maximus lectus facilisis quis. Fusce pretium purus posuere, egestas enim id, cursus tellus. Mauris lacinia porttitor purus, in convallis elit dignissim a. Nunc porttitor diam a vulputate eleifend. Sed urna purus, tempor ut nulla eu, blandit sollicitudin erat. Phasellus blandit nibh ut egestas consectetur. Etiam sed rutrum ex. Mauris eget ipsum id elit cursus porttitor quis eu justo. Ut eu est dignissim mi dignissim consectetur. Mauris tincidunt ante eget posuere placerat. Nulla dictum interdum libero euismod euismod. Morbi porttitor egestas purus, sed gravida odio ultricies vitae."
  },
]

function seedDB(){
  // REMOVE ALL CAMPGROUNDS
    Campground.remove({}, function(err){
      if(err){
        console.log(err);
      }
      console.log("Removed Campgrounds!");
      //ADD A FEW CAMPGROUNDS
      data.forEach(function(seed){
          Campground.create(seed, function(err, campground){
            if(err){
              console.log(err);
            } else
              console.log("Campground Created!");
            // CREATE A COMMENT
            Comment.create(
              {
                text: "this place is great, but I wish there was internet",
                author: "Homer"
              }, function(err, comment){
                if(err){
                  console.log(err);
                } else {
                    campground.comments.push(comment._id);
                    campground.save();
                    console.log("Created new comment");
                }
            })
          });
        });
  });
}

module.exports = seedDB;