let mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/cat_app', { useNewUrlParser: true });

// adding a new cat to the DB
let catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});

let Cat = mongoose.model("Cat", catSchema);

// let george = new Cat({
//   name: "Mrs. Norris",
//   age: 7,
//   temperament: "Evil"
// })

// george.save(function(err, cat) {
//   if(err) {
//     console.log("SOMETHING WENT WRONG!");
//   } else {
//     console.log("WE JUST SAVED A CAT TO THE DB");
//     console.log(cat);
//   }
// });
// Cat.create({
//   name: "Snow White",
//   age: 15,
//   temperament: "Bland"
// }, function(err, cat) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log(cat);
//   }
// });
// retrieve all cats from the DB and console.log() each one
Cat.find({}, function(err, cats){
  if(err) {
    console.log("OH NO! ERROR");
    console.log(err);
  } else {
    console.log("All THE CATS...");
    console.log(cats);
  }
})