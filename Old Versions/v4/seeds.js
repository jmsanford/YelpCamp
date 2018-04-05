var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment");

var data = [
  {
    name: "Clouds Rest", 
    image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?dpr=2&auto=format&fit=crop&w=767&h=512&q=60&cs=tinysrgb",
    description: "This is a fun campground, you should camp here."
  },
   {
    name: "Mesa Campground", 
    image:"https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?dpr=2&auto=format&fit=crop&w=767&h=511&q=60&cs=tinysrgb",
    description: "This is a fun campground, you should camp here."
  },
   {
    name: "Canyon Campground", 
    image:"https://images.unsplash.com/photo-1475483768296-6163e08872a1?dpr=2&auto=format&fit=crop&w=767&h=511&q=60&cs=tinysrgb",
    description: "This is a fun campground, you should camp here."
  },
]

function seedDB(){
  // REMOVE ALL CAMPGROUNDS
    Campground.remove({}, function(err){
      if(err){
        console.log(err);
      }
      console.log("Removed Campgrounds!");
      // ADD A FEW CAMPGROUNDS
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