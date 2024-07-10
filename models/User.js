const mongoose=require('mongoose');


const userSchema=new mongoose.Schema({
    firstName: {
        type:String,
        required:true,
        trim:yes,
    },
    lastName: {
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    accountType:{
        type:String,
        enum:["Admin","Student","Instructor"],
    },
    additionalInformation:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile",
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course",
        }
    ],
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type:String,
    },
    image:{
        type:String,
        required:true,
    },
    courseProgress:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"CourseProgress",
        }
    ],

});

module.exports=mongoose.model("user",userSchema);
    