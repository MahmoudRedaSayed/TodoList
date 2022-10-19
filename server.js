const express = require("express");
const body= require("body-parser");
const mongoose = require('mongoose');
const {connectDB,Items}=require("./config/db")
const dotenv=require("dotenv")
dotenv.config();

const date=require(__dirname+"/Data.js");
var app= express();
app.use(body.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");


app.listen(3000,function(){
    connectDB();
    console.log("the server is running now");
})
app.get("/:listName", async function  (req,res){
    const listName=req.params.listName;
    console.log(listName)
    Items.find({ListName:listName},function(err,items){
    res.render("list.ejs",{newListItems:items,listTitle:listName});
    });
    
})

app.post("/",async function (req,res){
    var itemtext=req.body.newItem;
    var listName=req.body.list;
    const item=await  new Items({ListName:listName,item:itemtext});
    item.save();
    res.redirect("/"+listName);
    
})

app.post("/:listName",async function(req,res){
    console.log("done");
    var id=req.body.checkbox;
    var listName=req.params.listName;
    Items.findByIdAndRemove({_id:id},function(err){
        if(!err)
        {
            console.log("the element is deleted ");
        }
    });
    res.redirect("/"+listName);
})




