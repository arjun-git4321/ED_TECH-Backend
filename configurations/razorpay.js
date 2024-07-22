const Razorpay=require("razorpay");


exports.instance=new Razorpay({
    key_id:process.env.RAZOR_ID,
    secret_key:process.env.RAZOR_KEY,
});