let express = require("express");
let router = express.Router({mergeParams: true});
let Campground = require("../models/campground");
let Comment = require("../models/comment");

// Comments new
router.get("/new", isLoggedIn, function(req, res) {
  console.log(req);
  // find campground by id
  Campground.findById(req.params.id, function(err, foundCampground) {
    if(err) {
      console.log(err);
    } else {
      res.render("comments/new", {campground: foundCampground});
    }
  });  
})

// Comment Create
router.post("/", function(req, res) {
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

// middleware
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;