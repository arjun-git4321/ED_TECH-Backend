const express=require("express");
const app=express();
require("dotenv").config();
const cors=require("cors");


const PORT=process.env.PORT || 8900

app.use(express.json());


const userRoute=require("./routes/User");
const profileRoute=require("./routes/Profile");
const paymentRoute=require("./routes/Payment");
const courseRoute=require("./routes/Course");
const fileUpload=require("express-fileupload");
const cookieParser=require("cookie-parser");


const {cloudinaryConnect}=require("./configurations/cloudinary");
cloudinaryConnect();

const connection=require('./configurations/database');
connection.dbConnect();


app.use(express.json());
app.use(
    cors({
        origin:"http://localhost:3000",
    })
)
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)

//mounting
app.use("./api/v1/auth",userRoute);
app.use("./api/v1/profile",profileRoute);
app.use("./api/v1/payments",paymentRoute);
app.use("./api/v1/course",courseRoute);

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Server is upon running "
    })
})




app.listen(PORT,()=>{
    console.log(`app running in port ${PORT}`);
})