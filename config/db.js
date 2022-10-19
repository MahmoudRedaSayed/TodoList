const mongoose=require("mongoose");
const connectDB=()=>{mongoose.connect(process.env.DATABASE_URI)
.then(()=>console.log("the database is connected"))
.catch(err=>console.log(err));}

const lists=mongoose.Schema({
    ListName:String,
    item:String
});

const Items=mongoose.model("Items",lists);

module.exports={Items,connectDB}

