const User=require("../models/User");
const Category=require("../models/Category");
const Course=require("../models/Course");

const {imageUploadCloudinary}=require("../utils/imageUploader");
const SubSection = require("../models/SubSection");


exports.courseCreate=async(req,res)=>{
    try{
        const {courseName,courseDescription,whatYouWillLearn,price,tag}=req.body;


        const thumbnail=req.body.thumbnailImage;

        // validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !thumbnail || !tag){
            return res.status(400).json({
                success:false,
                message:"All fields are mandatory",
            });
        }

        const userId=req.user.id;
        const instructorDetails=await User.findById(userId);

        console.log("instructor details", instructorDetails);


        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"instructor not found ",
            });
        }

        const categoryDetails=await Category.findById(Category)
        if(!categoryDetails){
            return res.status(400).json({
                sucess:false,
                message:"category details not found",
            });
        }

        const thumbnailImage=await imageUploadCloudinary.uploader.upload(thumbnail, process.env.FOLDER_NAME);


        const newCourse=await Course.create({
            courseName,
            courseDescription,
            whatYouWillLearn:whatYouWillLearn,
            instructor:instructorDetails._id,
            price,
            category:categoryDetails._id,
            thumbnailImage:thumbnailImage.secure_url,
        });

        await User.findByIdAndUpdate({_id:instructorDetails._id},
                                    {
                                        $push:{
                                            courses: newCourse._id,

                                        }
                                    },
                                    {new:true},
        )

        // update tag schema

        res.status(200).json({
            success:true,
            message:'Course created successfuly',
            data:newCourse._id,
        })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error while creating the course "
        })

    }

}


exports.showAllCourses=async(req,res)=>{
    try{
        const allCourses=await Course.find({
                                        courseName:true,
                                        price:true,
                                        ratingsAndReviews:true,
                                        instructor:true,
                                        studentEnrolled:true,
                                        thumbnail:true,

        }).populate("instructor").exec();
        res.status(200).json({
            success:true,
            message:"All courses data fetched successfully",
            data:allCourses,
        })

    }
    catch(err){
        res.status(500).json({
            result:false,
            message:'error while fetching the all courses',
            err:err.message,
        })
    }
}


exports.getCourseDetails=async(req,res)=>{
    try{
        const {courseId}=req.body;

        const courseDetails=await Course.find({_id:courseId}).populate({
            path:"instructor",
            populate:{
                path:"additionalInformation",
            }
        })
        .populate("category")
        .populate("ratingsAndReviews")
        .populate({
            path:"courseContent",
            populate:{
                path:"SubSection", 
            }
        })
        exec();


        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`Course did not found to this id ${courseId}`,
            });
        }

        res.status(200).json({
            success:true,
            message:`course successfully fetched to this id ${courseId}`,
            data:courseDetails,
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