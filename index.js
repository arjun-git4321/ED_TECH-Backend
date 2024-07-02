const express=require("express");
const app=express();
require("dotenv").config();


const PORT=process.env.PORT || 8900

app.use(express.json());





const connection=require('./configurations/database');
connection.dbConnect();


app.listen(PORT,()=>{
    console.log(`app running in port ${PORT}`);
})