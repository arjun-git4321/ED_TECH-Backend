const mongoose=require("mongoose");


const subSectionSchema=new mongoose.model({
    title:{
        type:String,
    },
    timeDuration:{
        type:String,
    },
    description:{
        type:String,
    },
    videoUrl:{
        type:String,
    }
});
module.exports=mongoose.model("subSection",subSectionSchema);