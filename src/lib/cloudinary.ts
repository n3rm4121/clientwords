import { v2 as cloudinary } from "cloudinary";

// Configuring cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (fileBuffer: Buffer, fileType: string) => {
  try {
    if (!fileBuffer) return null;

    // Convert the buffer to a data URI
    const fileStr = `data:${fileType};base64,${fileBuffer.toString('base64')}`;

    const response = await cloudinary.uploader.upload(fileStr, {
      folder: 'testimonials/companyLogo',
      transformation: [
        { width: 16, height: 16, crop: "limit" }, 
        { quality: "auto" },                       
        { fetch_format: "auto" }                    
      ],
      resource_type: "auto" // Tell Cloudinary to treat the file as an image
    });
 
    return response;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return null;
  }
};

const deleteFromCloudinary = async (publicId: string) => {
  try {
    const res = await cloudinary.uploader.destroy(publicId);
    if(res.result === "ok")
      console.log("file is deleted from cloudinary");
    else
      console.log("file is not deleted from cloudinary");
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
  }
}

export { uploadOnCloudinary, deleteFromCloudinary };