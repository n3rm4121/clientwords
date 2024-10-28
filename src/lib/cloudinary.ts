import config from "@/config";
import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";

// Configuring Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

const uploadOnCloudinary = async (fileBuffer: Buffer, type: string) => {
  try {
    if (!fileBuffer) return null;

    const processedImage = await sharp(fileBuffer)
      .webp({ quality: 1 })
      .toBuffer();

    // Convert the processed image buffer to a base64 data URI
    const fileStr = `data:image/webp;base64,${processedImage.toString('base64')}`;

    // Upload the processed image to Cloudinary (without transformations)
    const response = await cloudinary.uploader.upload(fileStr, {
      folder: 'testimonials/companyLogo',
      resource_type: "image",
      format: "webp",
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
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
  }
}

export { uploadOnCloudinary, deleteFromCloudinary };
