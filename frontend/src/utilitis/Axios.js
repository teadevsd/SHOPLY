import axios from "axios";
import SummaryAPI, { baseURL } from "../common/SummaryAPI";

const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true,  
    headers: {
      'Content-Type': 'application/json', 
    },
  });

//sending accessToken in header
  Axios.interceptors.response.use(
    async(config) =>{
      const accessToken = localStorage.getItem('accessToken')

      if (accessToken) {
        config.headers.authorization = `Bearer ${accessToken}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  );

  //extend lifespan of acessToken by refreshToken
  Axios.interceptors.response.use(
    (response) => {
      return response
    },
    async(error) => {
      let originalRequest = error.config

      if(error.message.status === 401 && !originalRequest.retry) {
        originalRequest.retry = true

        const refreshToken = localStorage.getItem('refreshToken')

        if(refreshToken) {
          const newAccessToken = await refreshAccessToken(refreshToken)

          if(newAccessToken) {
            originalRequest.headers.authorization = `Bearer ${newAccessToken}`
            return Axios(originalRequest)
          }
        }

      }

      return Promise.reject(error)
    }

  )

  const refreshAccessToken = async () => {
    try {
      const response = await Axios({
        ...SummaryAPI.refreshToken,
        headers: {
          Authorization : `Bearer ${refreshToken}`
        }
      })

      const accessToken = response.data.data.accessToken
      localStorage.setItem('accessToken', accessToken)
      return accessToken

      
    } catch (error) {
      console.log(error )
    }
  }
  
  export default Axios;
  