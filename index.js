const express = require("express");
const app = express();
const path = require("path");
const port = 8000;
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let posts = [
    {
        id: uuidv4(),
        username : "AKM01",
        content : "This is post01"
    },
    {
        id: uuidv4(),
        username : "AKM02",
        content : "This is post02"
    },
    {
        id: uuidv4(),
        username : "AKM03",
        content : "This is post03"
    }
]

app.get("/posts",(req,res)=>{
    res.render("posts.ejs", { posts })
})

app.get("/posts/new", (req,res)=>{
    res.render("new.ejs");
})

app.post("/posts", (req,res)=>{
    let {username, content} = req.body;
    posts.push({id: uuidv4(), username,content});
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params
    let post = posts.find((p)=>{
        return id === p.id;
    })
    console.log(id);
    console.log(post);
    res.render("show.ejs", {post});
})

app.patch("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content
    let post = posts.find((p) => p.id === id );
    post.content = newContent;
    res.redirect("/posts");
})

app.get("/posts/:id/edit", (req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id );
    console.log(post);
    res.render("edit.ejs", {post});
})

app.delete("/posts/:id", (req,res)=>{
    let {id} = req.params
    posts = posts.filter((p)=> p.id != id);
    console.log(posts);
    res.redirect("/posts");
})


app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`);
})