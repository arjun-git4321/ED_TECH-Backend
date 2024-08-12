const User=require("../models/User");
const crypto=require("crypto");
const mailSender=require("../utils/mailSender");
const bcryptjs=require("bcryptjs");


exports.passwordResetToken=async(req,res)=>{
    try{
        //requesting email
        const {email}=req.body;

        const existEmail=await User.findOne({email:email});
        if(!existEmail){
            return res.json({
                success:false,
                message:"email is not matched",
            });
        }
        const token=crypto.randomUUID();

        const updatedUser=await User.findOneAndUpdate(
                                                        {email:email},
                                                        {token:token,
                                                        resetPasswordExpires:Date.now() + 5*60*1000,
                                                        },
                                                        {new:true});
        const url=`http://localhost:3000/update-password/${token}`;

        await mailSender(email,`Password reset link ${url}`);
        return res.json({
            success:true,
            data:url,
            message:'email sent successfully,please check and update the password',
        })



    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:'server error while sending mail,please try again later',
        });
    }
}


exports.resetPasswordNow=async(req,res)=>{
    try{
        //data fetching from the body
        const {password,confirmPassword,token}=req.body;
        if(password !== confirmPassword){
            return res.json({
                success:false,
                message:'password does not match',
            })
        }


        //get user details from the db using token
        const userDetails=await User.findOne({token:token});
        if(!userDetails){
            return res.json({
                success:false,
                message:'token is invalid',
            })
        }

        if(userDetails.resetPasswordExpires<Date.now()){
            res.json({
                success:false,
                message:'token expired,please regenerate token',
            })
        }
        const hashPassword=await bcryptjs.hash(password,10);

        await User.findOneAndUpdate(
            {token:token},
            {password:hashPassword},
            {new:true}
        );

        res.status(200).json({
            success:true,
            message:'password reset successfully',
        });

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:'server error, while passoword chnaging',
        })

    }

}