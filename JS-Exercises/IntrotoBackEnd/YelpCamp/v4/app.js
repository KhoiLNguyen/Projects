let express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds"),
    Comment     = require("./models/comment");

mongoose.connect('mongodb://localhost:27017/yelp_camp_v3', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

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
      res.render("campgrounds/index", {campgrounds: allCampgrounds});
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
  res.render("campgrounds/new");
})

// SHOW - show info about one campground
app.get("/campgrounds/:id", function(req, res) {
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

// =====================
// COMMENT ROUTES
// =====================

app.get("/campgrounds/:id/comments/new", function(req, res) {
  // find campground by id
  Campground.findById(req.params.id, function(err, foundCampground) {
    if(err) {
      console.log(err);
    } else {
      res.render("comments/new", {campground: foundCampground});
    }
  });  
})

app.post("/campgrounds/:id/comments", function(req, res) {
  // look up campground using ID
  Campground.findById(req.params.id, function(err, foundCampground) {
    if(err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      // create new comment
      Comment.create(req.body.comment, function(err, comment) {
        if(err) {
          console.log(err);
        } else {
          foundCampground.comments.push(comment);
          foundCampground.save();
          res.redirect("/campgrounds/" + foundCampground._id);
        }
      });
    }
  });
  
  // connect new comment to campground
  // redirect campground show page
});

app.listen(3000, function() {
  console.log("YelpCamp Server Has Started!!");
});