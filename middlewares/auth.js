const jwt=require("jsonwebtoken");
require("dotenv").config();
const User=require("../models/User");


exports.auth=async(req,res,next)=>{
    try{
        // console.log("coming token",req.cookies);
        const token=req.cookies?.token || req.body?.token || req.header("Authorization").replace("Bearer ","");


        if(!token){
            return res.status(401).json({
                success:false,
                message:'token is missing',
            })
        }


        const decode= jwt.verify(token, process.env.JWT_SECRET);
        console.log(decode)
        req.user=decode;

        // res.status(400).json({
        //     success:false,
        //     message:"token is invalid",
        // })
        next();

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:'error while validating the token',
        })

    }

};

exports.isStudent=async(req,res,next)=>{
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:'this is protected route for student',
            });
        }
        next();

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'student type cannot be verified,please try again later',
        });


    }

}

exports.isInstructor=async(req,res,next)=>{
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:'this is protected route for instructor',
            })
        }
        next();

    }
    catch(error){
        res.staus(500).json({
            success:false,
            message:"instructor type cannot be vrified, please try again later",
        });

    }
}

exports.isAdmin=(req,res,next)=>{
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"this is protected route for admin",
            });
        }
        next()

    }
    catch(error){
        console.log(error);
        req.status(500).json({
            success:false,
            message:"admin type cannot be verified, please try again later",
        })
    }
}