import jwt from "jsonwebtoken";

// const generateAccessToken = async (userId) =>{
//     const token = jwt.sign({ userId: newUser?._id }, process.env.JWT_SECRET, { expiresIn: '10m' });

//     return token 
// }

// export default generateAccessToken

const generateAccessToken = async (userId) => {
    const token = jwt.sign({ userId }, process.env.SECRET_KEY_ACCESS_TOKEN, { expiresIn: '1h' });
    return token;
};

export default generateAccessToken;
