import toast from "react-hot-toast"
import SummaryAPI from "../common/SummaryAPI"
import Axios from "./Axios"
import AxiosToastError from "./AxiosToastError"

const fetchUserDetails = async () => {
    try {
        const response = await Axios({
            ...SummaryAPI.userDetails,
        })
        return response.data
        console.log("userDetails", response.data)
       
    } catch (error) {
        AxiosToastError(error)
    }
}

export default fetchUserDetails