const mongoose=require("mongoose");
const sendMail = require("../utils/mailSender");

const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    },
});

async function verificationMailSender(email,otp){
    try{
        let mails=await sendMail(email,otp);
        console.log(mails);

    }
    catch(err){
        console.log(err);
        throw err;
    }

}
otpSchema.pre("save", async function(next){
    await verificationMailSender(this.name,this.otp);
    next();
})
module.exports=mongoose.model("OTP",otpSchema);