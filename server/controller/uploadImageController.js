import uploadImageCloudinary from "../utilis/cloudinary.js";

export const uploadImageController = async (req, res) => {
    try {
        console.log("Uploaded File:", req.file); // Debugging line
        
        const file = req.file;
        if (!file) {
            return res.status(400).json({ 
                message: "No file uploaded", 
                error: true, 
                success: false 
            });
        }

        const uploadImage = await uploadImageCloudinary(file);

        return res.status(200).json({
            message: "Image uploaded successfully",
            error: false,
            success: true,
            data: uploadImage
        });
 
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error: true,
            success: false
        });
    }
};
