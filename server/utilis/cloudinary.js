import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageCloudinary = async (image) => {
  if (!image || !image.buffer) {
    throw new Error("No image buffer provided");
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "Shoply",
        resource_type: "auto", // Ensure all media types are handled
        public_id: `shoply_${Date.now()}`, // Unique ID for better organization
      },
      (error, uploadResult) => { 
        if (error) { 
          console.error("Cloudinary Upload Error:", error);
          return reject(error);
        }
        resolve(uploadResult);
      }
    );

    uploadStream.end(image.buffer);
  });
};

export default uploadImageCloudinary;
