const cloudinary=require("cloudinary").v2

exports.uploadImageToCloudinary =async (file, folder, height,quality) =>{
    try {
        // console.log("Temp file path:", file.tempFilePath);
        // const response = await cloudinary.uploader.upload(file.tempFilePath, { folder: folder, quality: quality }); // Include quality parameter
        // console.log("Cloudinary response:", response);
        // return response;

        const options={folder};
        if(height){
            options.height=height;
                }
        if(quality){
            options.quality=quality;
        }        
       options.resource_type="auto";
       
       return await cloudinary.uploader.upload(file.tempFilePath, options);
    } 
    
    catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        throw error; // Throw the error for handling in the calling function
    }
}
