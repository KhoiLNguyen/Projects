let express = require("express");
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
let campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

let Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Granite Hill",
//     image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg",
//     description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
//   }, function(err, campground) {
//     if(err) {
//       console.log(err);
//     } else {
//       console.log("NEWLY CREATED CAMPGROUND: ");
//       console.log(campground);
//     }
//   }
// )

// Landing page at root path
app.get("/", function(req, res) {
  res.render("landing");
})

// Campgrounds page
// INDEX route - Show all campgrounds
app.get("/campgrounds", function(req, res) {
  // get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds) {
    if(err) {
      console.log(err);
    } else {
      res.render("index", {campgrounds: allCampgrounds});
    }
  });
});


// CREATE - add new campground to DB
app.post("/campgrounds", function(req, res) {
  
  // get data from form and add to campgrounds array
  let name = req.body.name;
  let image = req.body.image;
  let desc = req.body.description;
  let newCampground = {name: name, image: image, description: desc};
  // Create a new campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated) {
    if(err) {
      console.log(err);
    } else {
      // redirect back to campgrounds page
      res.redirect("/campgrounds");
    }
  })
 
});

// NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
  res.render("new");
})

// SHOW - show info about one campground
app.get("/campgrounds/:id", function(req, res) {
  // find the campground with provided ID
  let id = req.params.id;
  Campground.findById(id, function(err, foundCampground) {
    if(err) {
      console.log(err);
    } else {
      res.render("show", {campground: foundCampground});
    }
  });
});

app.listen(3000, function() {
  console.log("YelpCamp Server Has Started!!");
});