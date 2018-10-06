let express = require("express");
let app = express();
let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

let campgrounds = [
  {name: "Salmon Creek", image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f8c67fa7e8b6bb_340.jpg"},
  {name: "Granite Hill", image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"},
  {name: "Mountain Goat's Nets", image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f8c67fa7e8b6bb_340.jpg"},
  {name: "Salmon Creek", image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f8c67fa7e8b6bb_340.jpg"},
  {name: "Granite Hill", image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"},
  {name: "Mountain Goat's Nets", image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f8c67fa7e8b6bb_340.jpg"}
];

// Landing page at root path
app.get("/", function(req, res) {
  res.render("landing");
})

// Campgrounds page
app.get("/campgrounds", function(req, res) {
  res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res) {
  
  // get data from form and add to campgrounds array
  let name = req.body.name;
  let image = req.body.image;
  let newCampground = {name: name, image: image};
  campgrounds.push(newCampground);

  // redirect back to campgrounds page
  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
  res.render("new");
})

app.listen(3000, function() {
  console.log("YelpCamp Server Has Started!!");
});