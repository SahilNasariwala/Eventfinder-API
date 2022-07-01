const mongoose=require("mongoose");

const eventsSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{type:String,required:true},
    date:{type:Date,required:true},
    time:{type:String,required:true},
    venue:{type:String,required:true},
    // user:{type:mongoose.Schema.Types.ObjectId,ref:'user'}
    user:{type:String}
}) 

module.exports=mongoose.model('Event',eventsSchema)