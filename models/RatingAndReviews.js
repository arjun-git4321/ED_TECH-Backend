const mongoose=require("mongoose");


const ratingAndReviewSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    reviews:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Course",
        index:true,
    },

});
module.exports=mongoose.model("RatingAndReview",ratingAndReviewSchema);
