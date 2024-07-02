const mongoose=require('mongoose');
require("dotenv").config();



exports.dbConnect=()=>{
    mongoose.connect(process.env.MONGODB_URL,{

    })
    .then(()=>{console.log("db connected successfully")})
    .catch((err)=>{
        console.log(err);
        console.log("error while connecting to Db");
        process.exit(1);
    })

}