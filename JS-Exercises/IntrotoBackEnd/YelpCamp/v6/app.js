let express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Campground      = require("./models/campground"),
    seedDB          = require("./seeds"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    User            = require("./models/user"),
    Comment         = require("./models/comment");

mongoose.connect('mongodb://localhost:27017/yelp_camp_v3', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();
app.use(express.static(__dirname + "/public"));

// PASSPORT CONFIGURATION
app.use(require("express-session")( {
  secret: "HUH CAI GI VAY",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

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

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
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

// =============
// AUTH ROUTES
// =============

// SHOW REGISTER FORM
app.get("/register", function(req, res) {
  res.render("register");
});

//handle signup logic
app.post("/register", function(req, res) {
  let newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user) {
    if(err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/campgrounds");
    })
  });
});

// show login form
app.get("/login", function(req, res) {
  res.render("login");
});

app.post("/login", passport.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}), function(req, res) {

})

// logout route
app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/campgrounds");
})

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

app.listen(3000, function() {
  console.log("YelpCamp Server Has Started!!");
});