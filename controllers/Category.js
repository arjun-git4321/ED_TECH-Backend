const Category=require("../models/Category");

exports.categoriesCreate=async (req,res)=>{
    try{
        const {name,description}=req.body;

        if(!name || !description){
             res.status(400).json({
                success:false,
                message:'All fields are mandatory',
            });
        }

        // create entry in db
        const chategoryDetails=await Category.create({
            name:name,
            description:description,
        });
        console.log(chategoryDetails);

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
        const categories= await Category.find({},{name:true,description:true});
        res.status(200).json({
            success:false,
            categories,
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

exports.categoryPageDetails=async(req,res)=>{
    try{
        const {categoryId}=req.body;

        const selectedCategery=await Category.findById(categoryId)
                                            .populate("courses")
                                            .exec();
        if(!selectedCategery){
            return res.status(404).json({
                success:false,
                message:"Data not found",
            })
        }

        const differentCategory=await Category.find({
                                _id:{$ne:categoryId}
                                })
                                .populate("courses")
                                .exec();

        // const topSellingCourses=await Category.courses.findById()
        return res.status(200).josn({
            success:true,
            data:{
                selectedCategery,
                differentCategory,
            }
        });

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Error while fetching categoryPageDetails",
        });

    }
}