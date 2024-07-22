const express=require("express");
const router=express.Router();


const {sendOpt,signUp,Login,}=require("../controllers/Auth");
const {passwordResetToken,resetPasowrdNow}=require("../controllers/ResetPassword");
const {auth}=require("../middlewares/auth");


//authentication routes

//for ligin,singnup,sendOtp

router.post("/signUp",signUp);

router.post("/login",Login);

router.post("/sendOtp",sendOpt);