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

    // console.log("filestr: ", fileStr)
    // Upload the file to cloudinary
    const response = await cloudinary.uploader.upload(fileStr, {
      folder: 'testimonials/companyLogo',
      transformation: [
        { width: 16, height: 16, crop: "limit" }, // Resize the image, limiting width and height to 800px
        { quality: "auto" },                        // Automatically adjust the quality to optimize image size
        { fetch_format: "auto" }                    // Automatically choose the best format (e.g., WebP)
      ],
      resource_type: "auto" // Tell Cloudinary to treat the file as an image
    });

    // File has been uploaded successfully
    console.log("file is uploaded on cloudinary ", response.url);
    // console.log(response);
    return response;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return null;
  }
};

export { uploadOnCloudinary };