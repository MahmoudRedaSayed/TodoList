const express = require("express");
const body= require("body-parser");
const date=require(__dirname+"/Data.js");
var app= express();
app.use(body.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");
// the data of the list
const items=["food ", "study" , "workout", "Gym"];

// the data of the list
const work=[];

app.listen(3000,function(){
    console.log("the server is running now");
})
app.get("/",function (req,res){
    console.log(date.dateDay);
    res.render("list.ejs",{newListItems:items,listTitle:"Home"});
})

app.post("/",function (req,res){
    var item=req.body.newItem;
    var listName=req.body.list;
    
    if(listName==="Home" )
    {
        if( item!=="")
        items.push(item);
        res.redirect("/");
    }
    else
    {
        if( item!=="")
        work.push(item);
        res.redirect("/work");
    }
})


app.get("/work",function (req,res){
    res.render("list.ejs",{newListItems:work,listTitle:"Work"});
})


