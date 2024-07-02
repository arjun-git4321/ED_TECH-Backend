
// const express=require("express");
const otpGenarator=require("otp-generator");
const user=require("../models/User");
const OTP=require("../models/OTP");
const bcryptjs=require("bcryptjs");
const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.sendOpt=async (req,res)=>{
    try{
        const {email}=req.body;

        const existingUser=await user.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"user already exist",
            });
        }

        let otp=otpGenarator.generate(6,{
            upperCaseAlpabets:false,
            lowerCaseAlphbets:false,
            specialChars:false,
        });
        console.log("otp generated successfully",otp);

        //check unique or not

        const result=OTP.findOne({otp:otp})

        while(result){
            otp=otpGenarator(6,{
            upperCaseAlpabets:false,
            lowerCaseAlphbets:false,
            specialChars:false,
            }); 
            result=OTP.findOne({otp:otp}); 
        }


        const otpSent=await OTP.create({
            email,
            otp
        });
        console.log(otpSent);

        res.status(200).json({
            success:true,
            otp,
            message:'otp sent successfully',
        })

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:'error while sending otp',
        })


    }

}

exports.signUp=async (req,res)=>{
    try{
        const {firstName,
               lastName,
               email,
               password,
               confirmPassword,
               accountType,
               contactNumber,
               otp,
        }=req.body;

        //validate user
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success:false,
                message:'All fields are mandatory',
            });
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:'password donot match, please fill carefully',
            });
        }

        const userExist=await user.findOne({email});
        if(userExist){
            return res.status(400).json({
                success:false,
                message:'user Already exist',
            })
        }


        const recentOtp= await OTP.findOne({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp);

        if(recentOtp.length==0){
            return res.status(400).json({
                success:false,
                message:'otp not found',
            })

        }
        else if(otp !== recentOtp.otp){
            return res.status(400).json({
                success:false,
                message:'otp invalid',

            })
                
        }


        const hashPassword=await bcryptjs(password,10);

        const profileDetails=await Profile.create({
            gender,
            about,
            dateOfBirth,
            contactNumber,
        })


        const user=await User.create({
            firstName,
            lastName,
            email,
            password:hashPassword,
            accountType,
            additionalInformation:profileDetails._id,
            image:`https://api.dicebear.com/9.x/initials/svg?seed=${firstName} ${lastName}`

        });

        return res.status(200).json({
            success:true,
            message:'user create successfully',
            user,
        });
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:'error while signIn',
        })

    }

}


exports.Login=async (req,res)=>{
    try{
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:'All fields are required, please fill details',
            });
        }

        const existUser=await user.findOne({email}).populate("additionalInformation");
        if(!existUser){
            res.status(400).json({
                success:false,
                message:'This user not found',
            });
        }
        if(await bcryptjs.compare(password,user.password)){
            const payload={
                email:user.email,
                id:user._id,
                role:user.role,

            }
            const token=jwt.sign(payload,process.env.SECRET,{
                expiresIn:"2hr",
            });
            user.token=token;
            user.password=undefined;


            const options={
                expires:new Date(Date.now() + 3*24*60*60*1000);
                httpOnly:true,
            }

            res.cookie("token",token,options).json({
                success:true,
                token,
                user,
                message:'user login successfully',

            });
        }
        else{
            req.status(400).json({
                success:false,
                message:'password incorrect',
            })
        }


    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"login failed please login later",
        })

    }
}