const SubSection =require("../models/SubSection");
const Section=require("../models/Section");
const { imageUploadCloudinary } = require("../utils/imageUploader");
// const { findByIdAndUpdate, findByIdAndDelete } = require("../models/Category");


exports.createSubSection=async(req,res)=>{
    try{
        const {sectionId,title,timeDuration,description}=req.body;

        const video=req.files.video;

        if(!sectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success:false,
                message:"fill all the properties",
            });
        }
        // const checkVideo=video.TypeOf(["mp4","hd"]).split('.').exec();

        const saveCloudiary=await imageUploadCloudinary(video,process.env.FILE_NAME);
        console.log(saveCloudiary);

        const subSectionDetails=await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:saveCloudiary.secure_url,

        });

        const updateSection=await Section.findByIdAndUpdate({_id:sectionId},{$push:{subSection:subSectionDetails._id}},{new:true})
                                                            .populate("subSection")

        res.status(200).json({
            success:true,
            data:updateSection,
            message:'successfully created subSection',
        })

    }
    catch(error){

    }
}
exports.deleteSubSection=async(req,res)=>{
    try{
        const {SubSectionId}=req.params;

        await findByIdAndDelete({SubSectionId});
        res.json({
            success:true,
            message:"SubSection delete successfully",
        })

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:'error while deleting SubSection',
        })

    }
}