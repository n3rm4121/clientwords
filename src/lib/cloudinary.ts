import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";  // Import sharp for image processing

// Configuring Cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (fileBuffer: Buffer, type: string) => {
  try {
    if (!fileBuffer) return null;

    // Use sharp to resize, compress, and convert to WebP format
    const processedImage = await sharp(fileBuffer)
      .resize(64, 64, { fit: "cover" })  // Resize to 64x64 pixels
      .webp({ quality: 80 })             // Convert to WebP and compress with quality 80
      .toBuffer();                       // Get the result as a buffer

    // Convert the processed image buffer to a base64 data URI
    const fileStr = `data:image/webp;base64,${processedImage.toString('base64')}`;
    console.log(fileStr)

    // Upload the processed image to Cloudinary (without transformations)
    const response = await cloudinary.uploader.upload(fileStr, {
      folder: 'testimonials/companyLogo',
      resource_type: "image", // Tell Cloudinary to treat the file as an image
      format: "webp",         // Convert the image to WebP format
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
    if (res.result === "ok")
      console.log("File is deleted from Cloudinary");
    else
      console.log("File is not deleted from Cloudinary");
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
  }
}

export { uploadOnCloudinary, deleteFromCloudinary };
