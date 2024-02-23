import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"


cloudinary.config({ 
  cloud_name:"dfzmam9tn", 
  api_key:177953718468919, 
  api_secret:"L9D_wkOFZpwQha3jXMco8922ocg",
});



const uploadOnCloudinary = async(localFilePath) =>{

    try {
        if(!localFilePath) return null

        const response = await cloudinary.uploader.upload(localFilePath)
        console.log("file is uploaded on cloudinary")
        fs.unlinkSync(localFilePath);
        return response;
        

    } catch (error) {
        console.log("error in cloud",error)
        fs.unlinkSync(localFilePath) //remove the temp file from the localfilepath as the uplaod operation got failed
    }

}


 const deleteFromCloudinary = async(cloudinaryPath) =>{



    try {
        const result = await cloudinary.uploader.destroy(cloudinaryPath);
        console.log("image deleted from cloudinary" , result)
        return result
    } catch (error) {
        console.log("error in deleting image from cloudinary" , error)
        throw error;
        
    }

}


export {uploadOnCloudinary, deleteFromCloudinary}

