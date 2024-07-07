const User=require("../models/User");
const Tag=require("../models/Tag");
const Course=require("../models/Course");

const {imageUploadCloudinary}=require("../utils/imageUploader")


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

        const userId=re.user.id;
        const instructorDetails=await User.findById(userId);

        console.log("instructor details", instructorDetails);


        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"instructor not found ",
            });
        }

        const tagDetails=await Tag.findById(tag)
        if(!tagDetails){
            return res.status(400).json({
                sucess:false,
                message:"tag details not found",
            });
        }

        const thumbnailImage=await imageUploadCloudinary.uploader.upload(thumbnail, process.env.FOLDER_NAME);


        const newCourse=await Course.create({
            courseName,
            courseDescription,
            whatYouWillLearn:whatYouWillLearn,
            instructor:instructorDetails._id,
            price,
            tag:tagDetails._id,
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
            message:"All courses data fetched succesfully",
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