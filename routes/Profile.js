const express=require("express");
const router=express.Router();
const {auth}=require("../middlewares/auth");

const {updateProfile,deleteAccount,getUserDetails,updateDisplayPicture}=require("../controllers/Profile");


//profile routes
router.post("/updateProfile",auth,updateProfile);
router.delete("/deleteAccount",auth,deleteAccount);
router.get("/getUserDetails",auth,getUserDetails);
router.put("/updateDisplayPicture",auth,updateDisplayPicture);



module.exports=router;