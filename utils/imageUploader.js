const cloudinary=require("cloudinary").v2;


exports.imageUploadCloudinary=async(file,folder,quality,height)=>{
    const options={folder};
    if(quality){
        options.quality=quality;
    }
    if(height){
        options.height=height;
    }

    return await cloudinary.uploader.upload(file.tempFilePath,options);

}