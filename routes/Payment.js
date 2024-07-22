const express=require("express");
const router=express.Router();

const {capturePayment,verifySingnature}=require("../controllers/Payments");
const {auth,isStudent,isInstructor,isAdmin}=require("../middlewares/auth");
router.post("/capturePayment",auth,isStudent,capturePayment);
router.post("/verifySignature",verifySingnature);


module.exports=router;
