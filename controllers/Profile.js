const Profile=require("../models/Profile");
const User=require("../models/User");
const { imageUploadCloudinary } = require("../utils/imageUploader");
exports.updateProfile=async(req,res)=>{
    try{
        const {gender,dateOfBirth="",about="",contactNumber}=req.body;
        const Id=req.user.id;
        console.log(Id);

        if(!contactNumber || !gender ){
            return res.status(400).json({
                success:false,
                message:'properties are missing, please missing',
            })
        }

        const userDetails=await User.findById(Id);
        const profileId=userDetails.additionalInformation;
        const profileDetails=await Profile.findById(profileId);

        profileDetails.dateOfBirth=dateOfBirth;
        profileDetails.about=about;
        profileDetails.gender=gender;
        profileDetails.contactNumber=contactNumber;
        await profileDetails.save();
        res.status(200).json({ 
            success:true,
            message:'profile updated successfully',
            profileDetails,

        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"error while creating the profile",
        })
    }
}

exports.deleteAccount=async(req,res)=>{
    try{
        const id=req.id.params;
        const userId=await User.findById(id);
        if(!userId){
            return res.status(400).json({
                success:false,
                message:'user id not found',
            });
        }
        await Profile.findByIdAndDelete({_id:profileDetails.additionalInformation});

        await User.findByIdAndDelete({_id:id});

        return res.status(200).josn({
            success:true,
            message:"user deleted successfully"
        })

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"error while deleting the account",
        })


    }

}
exports.updateDisplayPicture=async(req,res)=>{
    try{
        const displayPicture=req.files.displayPicture;
        const userID=req.user.id;
        const image=await imageUploadCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        console.log(image);
        const updatedProfile=await User.findByIdAndUpdate(
            {_id:userID},
            {image:image.secure_url},
            {new:true},
        )
        res.send({
            success:true,
            message:"image uploaded successfully",
            data:updatedProfile,
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


exports.getUserDetails=async(req,res)=>{
    try{
        const id=req.user.id;


        const userDetails=await User.findById(id).populate("additionalInformation").exec();
        return res.status(200).json({
            success:true,
            data:userDetails,
            message:"user details successfully fetched",
        })

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"error while fetching user details",
        })

    }

}