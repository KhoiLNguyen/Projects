let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo", { useNewUrlParser: true });

// POST - title, content
let postSchema = new mongoose.Schema({
  title: String,
  content: String
});
let Post = mongoose.model("Post", postSchema);

// USER - email, name
let userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [postSchema]
});
let User = mongoose.model("User", userSchema);

// let newUser = new User({
//   email: "hermione@hogwarts.edu",
//   name: "HermioneGranger"
// });

// newUser.posts.push({
//   title: "How to bre polyjuice potion",
//   content: "Just kidding. Go to potions class to learn it!"
// });

// newUser.save(function(err, user) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// });

// let newPost = new Post({
//   title: "Reflections on Apples",
//   content: "They are delicious!"
// });

// newPost.save(function(err, post) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log(post);
//   }
// });

User.findOne({name: "HermioneGranger"}, function(err, user) {
  if(err) {
    // console.log(err);
  } else {
    user.posts.push({
      title: "3 things I  really hate",
      content: "Fuck Fuck Fuck"
    });
    user.save(function(err, user) {
      if(err) {
        console.log(err);
      } else {
        console.log(user);
      }
    });
  }
});