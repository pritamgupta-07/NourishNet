import {v2 as cloudinary} from 'cloudinary';
import dotenv  from 'dotenv';
import fs from 'fs'
import path from 'path';

dotenv.config();
          
cloudinary.config({ 
  cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}` || "",
  api_key: `${process.env.CLOUDINARY_API_KEY}` || "", 
  api_secret: `${process.env.CLOUDINARY_API_SECRET}` || "",
});

const workingDir = path.join(process.cwd(), '/public/temp/')

const uploadOnCloudinary = async (localFilePath: string) => {
    try {

        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        console.log("file is uploaded on cloudinary ", response.url);

        // console.log(workingDir + localFilePath)

        // fs.unlinkSync(workingDir + localFilePath)
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got successfull
        return response;

    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}



export {uploadOnCloudinary}