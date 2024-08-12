const mongoose=require("mongoose");
const sendMail = require("../utils/mailSender");
const emailTemplate=require("../mail/emailVerificationTemplate");

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
        expires:60*5,
    },
});

async function verificationMailSender(email,otp){
    try {
		const mailResponse = await sendMail(
			email,
			"Verification Email",
			emailTemplate(otp)
		);
		console.log("Email sent successfully: ", mailResponse.response);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}

}
otpSchema.pre("save", async function (next) {
	console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await verificationMailSender(this.email, this.otp);
	}
	next();
});
const OTP=mongoose.model("OTP",otpSchema);
module.exports=OTP;