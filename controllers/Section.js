const Section=require("../models/Section");
const Course=require("../models/Course");
const { findByIdAndDelete } = require("../models/Category");


exports.createSection=async(req,res)=>{
    try{
        const{sectionName,courseId}=req.body;

        if(!sectionName || !courseId){
            return res.status(400).json({
                result:false,
                message:"properties are missing",
            });
        }
        const newSection=await Section.create({sectionName});

        const updateCourseDetails=await Course.findByIdAndUpdate(courseId,{
                                                                        $push:{
                                                                            courseContent:newSection._id,
                                                                        }
                                                                    },
                                                                        {new:true},)

         res.status(200).json({
            success:true,
            updateCourseDetails,
            message:'section create succeesfully',
         })                                                               

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:'error while creating section',
        })
    }
}

exports.updateSection=async (req,res)=>{
    try{
        const {sectionName,sectionId}=req.body;
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:'properties are missing',
            });
        }
        const updateDetails= await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});
        res.status(200).json({
            success:true,
            message:"section updated successfully",
        })

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:'error while updating the section',
        })

    }

}

exports.deleteSection=async(req,res)=>{
    try{
        const {sectionId}=req.params;

        await findByIdAndDelete({sectionId});
        res.json({
            success:true,
            message:"section delete successfully",
        })

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:'error while deleting section',
        })

    }
}