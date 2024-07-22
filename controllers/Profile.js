const Profile=require("../models/Profile");
const User=require("../models/User");
exports.updateProfile=async(req,res)=>{
    try{
        const {gender,dateOfBirth="",about="",contactNumber}=req.body;
        const Id=req.body.id;

        if(!contactNumber || !gender || !Id){
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


exports.getUserDetails=async(req,res)=>{
    try{
        const id=req.user.id;


        const userDetails=await User.findById(id).populate("additionalInformation").exec();
        return res.status(200).json({
            success:true,
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