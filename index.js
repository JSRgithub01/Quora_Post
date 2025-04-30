const express = require("express");
const app = express();
const path = require("path");
const port = 8000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let posts = [
    {
        id: "1a",
        username : "AKM01",
        content : "This is post01"
    },
    {
        id: "2b",
        username : "AKM02",
        content : "This is post02"
    },
    {
        id: "3c",
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
    posts.push({username,content})
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params
    let post = posts.find((p)=>{
        return id === p.id;
    })
    res.render("show.ejs", {post});
})

app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`);
})