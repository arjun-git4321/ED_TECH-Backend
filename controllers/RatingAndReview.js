const RatingAndReview=require("../models/RatingAndReviews");
const Course=require("../models/Course");



exports.creteRatingAndReview=async(req,res)=>{
    try{
        const {userId}=req.user.id;
        const {rating,reviews,courseId}=req.body;


        const courseDetails=await Course.findOne({_id:{courseId},
                                                    studentEnrolled:{$elemMatch:{$eq:userId}},
                                                });

        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:'student not enrolled the course',
            });
        }

        const alreadyReviewed=await RatingAndReview.findOne({user:userId,
                                                            Course:courseId,
                                                            
        });
        if(!alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"this user is alredy reviewed",
            });
        }

        const ratingReview=await RatingAndReview.create({
            rating,
            reviews,
            course:courseId,
            user:userId,
        });

    }
    catch(error){

    }
}
exports.getAverageRating=async(req,res)=>{
    try{
        const courseId=req.body.courseId;

        const ratingAndReview=await RatingAndReview.aggregate([
            //here aggregate function returns the array
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:numm,
                    averageRating:{$avg:'$rating'},

                }
            }
        ]);

        if(result.length > 0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            })
        }
        
        return res.status(200).json({
            success:true,
            averageRating:0,
            message:"averageRating is 0, No rating given till now", 

        })

    }
    catch(eror){

    }
}
exports.getAllRatings=async(req,res)=>{
    try{

        const allReviews=await RatingAndReview.find({}).sort({rating:"desc"}).poupulate({
                                                        path:"user",
                                                        select:"firstName lastName email image"
                                                        })
                                                        .populate({
                                                            path:"course",
                                                            select:"courseName",
                                                        })
                                                        .exec();
        
        return res.status(200).json({
            success:true,
            message:"All reviews are fetched successfully",
            data:allReviews,
        })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            error:error.message,
        })

    }
}