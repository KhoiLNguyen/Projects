let express = require("express");
let router = express.Router();
let Campground = require("../models/campground");
// Campgrounds page
// INDEX route - Show all campgrounds
router.get("/", function(req, res) {
  
  // get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds) {
    if(err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds: allCampgrounds});
    }
  });
});


// CREATE - add new campground to DB
router.post("/", isLoggedIn, function(req, res) {
  
  // get data from form and add to campgrounds array
  let name = req.body.name;
  let image = req.body.image;
  let desc = req.body.description;
  let author = {
    id: req.user._id,
    username: req.user.username
  };
  let newCampground = {name: name, image: image, description: desc, author: author};
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
router.get("/new", isLoggedIn, function(req, res){
  res.render("campgrounds/new");
})

// SHOW - show info about one campground
router.get("/:id", function(req, res) {
  // find the campground with provided ID
  let id = req.params.id;
  Campground.findById(id).populate("comments").exec(function(err, foundCampground) {
    if(err) {
      console.log(err);
    } else {
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

// middleware
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;