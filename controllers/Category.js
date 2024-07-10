const Category=require("../models/Category");

exports.categoriesCreate=async (req,res)=>{
    try{
        const {name,description}=req.body;

        if(!name || description){
            res.status(400).json({
                success:false,
                message:'All fields are mandatory',
            });
        }

        // create entry in db
        const tagDetails=await Category.create({
            name:name,
            description:description,
        });
        console.log(tagDetails);

        return res.status(200).json({
            success:true,
            message:'successsfully created tags',
        })


    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:'error,while creating tags',
        })

    }

}

exports.getAllCategories=async (req,res)=>{
    try{
        const tags= await Category.find({},{name:true,description:true});
        res.status(200).json({
            success:false,
            tags,
            message:'All categories fetched successfully',
        })
        

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"error while finding all categories",
        })
    }

}