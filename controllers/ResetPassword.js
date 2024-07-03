const user=require("../models/User");
// const 



exports.passwordReset=async(req,res)=>{
    try{
        //requesting email
        const {email}=req.body;

        const existEmail=await user.findOne({email:email});
        if(!existEmail){
            return res.json({
                success:false,
                message:"email is not matched",
            });
        }
        const token=crypto.randomUUID();

        const updatedUser=await user.findOneAndUpdate(
                                                        {email:email},
                                                        {token:token,
                                                        resetPasswordExpires:Date.now() + 5*60*1000,
                                                        },
                                                        {new:true});
        const url=`http://localhost:3000/update-password/${token}`;

        await mailSender(email,`Password reset link ${url}`);
        return res.json({
            success:true,
            message:'email sent successfully,please check and update the password',
        })


    }
    catch(error){

    }

}