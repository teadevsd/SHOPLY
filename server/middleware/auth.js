//auth is for login users

import jwt from "jsonwebtoken";

const auth = async (request, response, next)=>{

    try {
        const token = request.cookies.accessToken || request?.header?.authorization?.split(" ")[1]
        console.log('token', token)

        if (!token){
            return response.status(401).json({
                messgae: "Provide token"
            })
        }

        //check if token is valid--not expired
        const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN)
        console.log('decode', decode)

        //if expired
        if(!token){
            return response.status(401).json({
                messgae: "Unathorized access",
                error: true,
                success: false
            })
        }

        request.userId = decode.id
        next();

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export default auth 