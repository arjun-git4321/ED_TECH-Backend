const express=require("express");
const router=express.Router();


const {sendOpt,signUp,Login,}=require("../controllers/Auth");
const {passwordResetToken,resetPasswordNow}=require("../controllers/ResetPassword");
const {auth}=require("../middlewares/auth");


//authentication routes

//for ligin,singnup,sendOtp

router.post("/signUp",signUp);

router.post("/login",Login);

router.post("/sendOtp",sendOpt);

//password resetToken & resetPasswordNow
router.post("/passwordResetToken",passwordResetToken);

router.post("/updatePasswordNow",resetPasswordNow);

module.exports=router;