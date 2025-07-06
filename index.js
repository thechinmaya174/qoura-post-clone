const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");

const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
         id : uuidv4(),
         username : "chinmaya",
         content : "I love coding!" 
    },
    {
         id : uuidv4(),
         username : "chinmayaAchar",
         content : "out door learning is fun"
    },
    {
         id : uuidv4(),
         username : "sachin",
         content : "Life is full of choices"
    },

];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts: posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
   let {username, content} = req.body;
   let id = uuidv4();
   posts.push({ id, username, content});
   res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    console.log(id);
    let post = posts.find((p) => p.id === id);
    res.render("show.ejs" , {post} );
;
});

app.patch("/posts/:id",(req, res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => p.id === id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("edit.ejs" , {post} );
})

app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    posts = posts.filter((p) => p.id !== id);
    res.redirect("/posts");
})

app.listen(port, () => {
    console.log("listening to port : 8080");
});