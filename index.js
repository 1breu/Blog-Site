//@author:    Andrés Breucop
//@file:      index.js
//@date:      March 3, 2021

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const loremIpsum1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ut porttitor leo a diam sollicitudin tempor. Metus vulputate eu scelerisque felis imperdiet proin fermentum. Penatibus et magnis dis parturient montes nascetur ridiculus mus. Volutpat commodo sed egestas egestas fringilla. Sapien eget mi proin sed libero enim sed faucibus turpis. Tincidunt praesent semper feugiat nibh sed pulvinar proin. Montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Amet mauris commodo quis imperdiet massa tincidunt. Duis tristique sollicitudin nibh sit amet commodo. Id cursus metus aliquam eleifend mi in. Tortor condimentum lacinia quis vel eros donec ac odio tempor. Tempor orci eu lobortis elementum. Egestas integer eget aliquet nibh praesent tristique magna sit. Vitae sapien pellentesque habitant morbi."
const loremIpsum2 = "Convallis convallis tellus id interdum velit laoreet id. Arcu non odio euismod lacinia at quis risus. Nisi quis eleifend quam adipiscing vitae proin. Tortor condimentum lacinia quis vel. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Morbi tristique senectus et netus et malesuada. Ut consequat semper viverra nam libero justo. Mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar. Ut sem viverra aliquet eget sit amet tellus cras adipiscing. Rutrum quisque non tellus orci ac auctor augue. Fermentum posuere urna nec tincidunt praesent semper feugiat nibh. Euismod in pellentesque massa placerat duis ultricies lacus sed. Interdum velit laoreet id donec ultrices tincidunt. A erat nam at lectus urna duis. Placerat orci nulla pellentesque dignissim. Cursus sit amet dictum sit amet justo. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing. In ornare quam viverra orci sagittis. Egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam."
const loremIpsum3 = "Ac orci phasellus egestas tellus rutrum tellus. Feugiat in ante metus dictum. In fermentum et sollicitudin ac. Cras pulvinar mattis nunc sed blandit libero volutpat sed. Vitae et leo duis ut diam quam. Ut tristique et egestas quis ipsum suspendisse ultrices gravida dictum. Id venenatis a condimentum vitae sapien. Commodo elit at imperdiet dui accumsan sit amet nulla. In hac habitasse platea dictumst quisque. Elit eget gravida cum sociis natoque penatibus et magnis dis. Purus in mollis nunc sed id semper risus. Enim ut tellus elementum sagittis vitae. Massa massa ultricies mi quis. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Maecenas accumsan lacus vel facilisis volutpat est velit egestas dui. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Gravida rutrum quisque non tellus orci ac auctor augue mauris. Adipiscing tristique risus nec feugiat. Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Sit amet venenatis urna cursus eget nunc."

let blogPosts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("home", {
    lorem1: loremIpsum1,
    blogEntries: blogPosts
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    lorem2: loremIpsum2
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    lorem3: loremIpsum3
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.get("/entry/:postName", function(req, res) {
  let postInfo = {};
  let lcPostName = req.params.postName.toLowerCase();
  lcPostName = lcPostName.replace(/ /g, "\-");

  blogPosts.forEach(function(post) {
    let lcBlog = post.postTitle.toLowerCase();
    lcBlog = lcBlog.trim();
    lcBlog = lcBlog.replace(/ /g, "\-");

    if (lcBlog === lcPostName) {
      postInfo = {
        title: post.postTitle,
        content: post.postMsg
      }
      res.render("post", {postInfo:postInfo});
    }
  });
});

app.post("/compose", function(req, res) {
  const newPost = {
    postTitle: req.body.postTitle,
    postMsg: req.body.postMsg
  };

  blogPosts.push(newPost);
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
