import SummaryAPI from "../common/SummaryAPI";
import Axios from "./Axios";

const uploadImage = async (image) => {
    try {
        const formData = new FormData();
        formData.append("image", image);

        console.log("Uploading Image:", image);

        const response = await Axios({
            ...SummaryAPI.uploadImage,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data" // Ensure correct headers
            },
            withCredentials: true
        });

        return response;
        
    } catch (error) {
        console.error("Image Upload Error:", error);
        return error;
    }
}

export default uploadImage;
