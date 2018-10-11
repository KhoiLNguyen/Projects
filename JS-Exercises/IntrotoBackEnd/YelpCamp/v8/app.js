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

// requiring routes
let commentRoutes     = require           ("./routes/comments"),
    campgroundRoutes  = require("./routes/campgrounds"),
    authRoutes        = require("./routes/index");

mongoose.connect('mongodb://localhost:27017/yelp_camp_v3', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
// seedDB();

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

app.use(authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, function() {
  console.log("YelpCamp Server Has Started!!");
});