const express = require("express");
const body= require("body-parser");
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://MahmoudReda:Zi5yl2lRXTySMJyH@firstcluster.23iywgv.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log("the database is connected"))
.catch(err=>console.log(err));
const date=require(__dirname+"/Data.js");
var app= express();
app.use(body.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");
const lists=mongoose.Schema({
    ListName:String,
    item:String
});

const Items=mongoose.model("Items",lists);

app.listen(3000,function(){
    console.log("the server is running now");
})
app.get("/:listName",function (req,res){
    const listName=req.params.listName;
    Items.find({ListName:listName},function(err,items){
    res.render("list.ejs",{newListItems:items,listTitle:listName});
    });
    
})

app.post("/",function (req,res){
    var itemtext=req.body.newItem;
    var listName=req.body.list;
    const item=new Items({ListName:listName,item:itemtext});
    item.save();
    res.redirect("/"+listName);
    
})

app.post("/:listName",function(req,res){
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




