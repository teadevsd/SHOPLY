import toast from "react-hot-toast"
import Axios from "./Axios.js"
import AxiosToastError from "./AxiosToastError.js"
import SummaryAPI from "../common/SummaryAPI.js"

const fetchUserDetails = async () => {
    try {
        const response = await Axios({
            ...SummaryAPI.userDetails,
        })
        return response.data
        
       
    } catch (error) {
        AxiosToastError(error)
    }
}

export default fetchUserDetails