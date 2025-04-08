import express from "express";
const app = express();
const port = 8080;

app.get("/", (req, res)=>{
    res.send("Hello World");
});

app.post("/sign-up", (req, res)=>{
    
});

app.listen(port);