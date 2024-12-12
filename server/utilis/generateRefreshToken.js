import jwt from "jsonwebtoken"
import UserModel from "../models/user.models.js"

const generateRefreshToken = async (userId) =>{
    const token = await jwt.sign({ id : userId},
        process.env.SECRET_KEY_REFRESH_TOKEN, {expiresIn: '7d'})

    //Update in Database
    const updateRefreshTokenUser = await UserModel.updateOne({ _id : userId },
        {
            refresh_token : token
        }
)    
    return token 
}

export default generateRefreshToken