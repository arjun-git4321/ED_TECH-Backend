const jwt=require("jsonwebtoken");
require("dotenv").config();
const user=require("../models/User");


exports.auth=async(req,res,next)=>{
    try{
        const token=req.cookies.token || req.token.body || req.header("Authorisation").replace("Bearer ","");

        if(!token){
            res.status(400).json({
                success:false,
                message:'token not found',
            })
        }
        const decode= jwt.verify(token,process.env.JWT_SECRET);
        console.log(decode)
        req.user=decode;

        res.staus(400).json({
            success:false,
            message:"token is invalid",
        })
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
        if(req.user.acoountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:'this is protected route for student',
            });
        }
        next();

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:'student type cannot be verified,please try again later',
        });


    }

}

exports.isInstructor=async(req,res,next)=>{
    try{
        if(req.user.accountType !== "isInstructor"){
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
        console.log(eror);
        req.status(500).json({
            success:false,
            message:"admin type cannot be verified, please try again later",
        })
    }
}