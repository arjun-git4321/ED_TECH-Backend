const {instance}=require("../configurations/razorpay");
const User=require("../models/User");
const Course=require("../models/Course");
const mailSender=require("../utils/mailSender");
const courseEnrollmentEmail=require('../mail/courseEnrollmentEmail');



exports.capturePayment=async(req,res)=>{
    const {course_id}=req.body;
    const userId=req.user.body;

    if(!course_id){
        return res.status(400).json({
            success:false,
            message:"course id not valid",
        });
    }

    let course;
    try{
        course=await Course.findById(course_id);
        if(!course){
            return res.status(400).json({
                success:false,
                message:"could not find the course",
            })
        }
        const uID=new mongoose.Types.ObjectId(userId);
        if(course.studentEnrolled.includes(uID)){
            return res.status(400).json({
                success:false,
                message:"This student already enrolled",
            })
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message,

        })
    }

    const amount=Course.price;
    const currency="INR";

    const options={
        amount:amount*100,
        currency,
        receipt:Math.random(Date.now().toString()),
        notes:{
            course_id:course_id,
            userId,
        }
    };


    try{
        const paymentResponse=await instance.orders.create(options);
        console.log(paymentResponse);
        return res.status(200).json({
            success:true,
            courseName:course.courseName,
            courseDescription:course.courseDescription,
            thumbnail:course.thumbnail,
            orderId:paymentResponse.orderId,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount,
        })

    }
    catch(error){
        console.log(error);
        res.json({
            success:false,
            message:"could not initiate the order",
        })

    }
};

exports.verifySingnature=async(req,res)=>{
    const webhookSecret="1234567";
    const signature=req.headers["x-razorpay-signature"];

    const shasum=crypto.createHmac("sha256",webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest=shasum.digest("hex");

    if(digest == signature){
        console.log("request is authorized");

        const [course_id,userId]=req.body.payload.payment.entity.notes; 


    try{

        const courseEnrolled=await Course.findByIdAndUpdate({_id:course_id},
            {$push:{studentEnrolled:userId}},
            {new:true},
        )

        console.log(courseEnrolled);


        const studentEnrolled=await User.findByIdAndUpdate({_id:userId},
            {$push:{courses:course_id}},
            {new:true},
        )

        console.log(studentEnrolled);

        const emailResponse=await mailSender(studentEnrolled.email,
            "Congratulations from CodeHackers",
            "Congratulations you onboarded into the new CodeHackers course",
        )

        console.log(emailResponse);
        return res.json(200).json({
            success:true,
            message:"Signature verified and Courses added",
        });

    }
        catch(error){
            console.log(error);
         res.status(500).json({
            success:false,
            error:error.message,
         })
        }
    }
    else{
        return res.status(400).json({
            success:false,
            message:"Invalid request",
        })
    }

    

}