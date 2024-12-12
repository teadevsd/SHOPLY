import sendEmail from "../config/sendEmail.js"
import UserModel from "../models/user.models.js"
import bcryptjs from "bcryptjs"
import verifyEmailTemplate from "../utilis/verifyEmailTemplate.js"
import generateAccessToken from "../utilis/generateAccessToken.js"
import generateRefreshToken from "../utilis/generateRefreshToken.js"
import uploadImageCloudinary from "../utilis/cloudinary.js"
import generateOTP from "../utilis/generateOTP.js"
import forgotPasswordTemplate from "../utilis/forgotPasswordTemplate.js"
import jwt from "jsonwebtoken"

//register user controller
export async function registerUserController(request, response) {
    try {
        const { name, email, password } = request.body

        if(!name || !email || !password){
            return response.status(400).json({
                message: "Provide email, name, password",
                error: true,
                success: false
            })
        };

        const user = await UserModel.findOne({ email })

        if(user){
            return response.json({
                message : " Already registered email",
                error: true,
                success: false
            })
        }

        //Hash password
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)

        //Save to Database
        const payload = {
            name, 
            email,
            password: hashPassword
        }

        const newUser = new UserModel(payload)
        newUser.save();

        //Check if email is correct - Brevo
        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?codes=${newUser?._id}`

        const verifyEmail = await sendEmail({
            to: email,
            subject: "Verify email from Shoply!",
            html: verifyEmailTemplate({
                name,
                url: verifyEmailUrl
            })
        });

        return response.json({
            message: "User registered successfully!",
            error: false,
            success: true,
            data : newUser
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//verify user controller
export async function verifyEmailController(request, response) {
    try {
        const { code } = request.body
        const user = await UserModel.findOne({_id : code})

        if (!user){
            return response.status(400).json({
                message: "Invalid code",
                error: true,
                success: false
            })
        };
        //If user is valid--successful
        const updateUser = await UserModel.updateOne({ _id : code },{
            verify_email: true
        });

        return response.json({
            message: "Verification successful",
            error: false,
            success: true
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//login user controller
export async function loginController(request, response) {
    try {
        const { email, password } = request.body

        if(!email || !password) {
            return response.status(400).json({
                message: "Provide email and password",
                error: true,
                password: false
            })
        }
        const user = await UserModel.findOne({ email });

        if(!user){
            return response.status(400).json({
                message: "Email not found",
                error: true,
                success: false
            })
        };
        if(user.status !== "Active"){
            return response.status(400).json({
                message: "Contact support",
                error: true,
                success: false
            })
        };

        const checkPassword = await bcryptjs.compare(password, user.password)

        if(!checkPassword) {
            return response.status(400).json({
                message: "Invalid password",
                error: true,
                sucess: false
            })
        }

        //accessToken: directly for login purpose //refreshToken: increase lifespan of accessToken
        const accessToken = await generateAccessToken(user._id);
        const refreshToken = await generateRefreshToken(user._id);

        // Save refreshToken to the database
        user.refresh_token = refreshToken; // Assign token to the user's refresh_token field
        await user.save(); //Save the updated user object


        //save token to cookie
        const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        response.cookie('accessToken', accessToken, cookieOption);
        response.cookie('refreshToken', refreshToken, cookieOption);

        return response.json({
            message: "Login successful",
            error: false,
            sucess: true,
            data: {
                accessToken,
                refreshToken
            }
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//logout user controller
export async function logOutController(request, response) {

    const userid = request.userId

    try {
        const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        response.clearCookie('accessToken', cookieOption);
        response.clearCookie('refreshToken', cookieOption);

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
            refresh_token : ""
        })

        return response.json({
            message: "Logout successfully",
            error: false,
            sucess: true            
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//upload user avatar
export async function uploadAvatarController(request, response) {
    try {
        const userId = request.userId; // from auth middleware
        const image = request.file; // from multer middleware

        // Debug: Validate input
        console.log("Image received:", image);

        if (!image) {
            return response.status(400).json({
                message: "No file uploaded",
                error: true,
                success: false,
            });
        }

        // Upload to Cloudinary
        const upload = await uploadImageCloudinary(image);

        // Debug: Log upload result
        console.log("Upload result from Cloudinary:", upload);

        if (!upload || !upload.url) {
            throw new Error("Failed to upload image to Cloudinary");
        }

        // Update User Avatar in Database
        console.log("User ID:", userId);
        const updateUser = await UserModel.findByIdAndUpdate(
            userId,
            { avatar: upload.url },
            { new: true } // Ensure updated document is returned
        );

        if (!updateUser) {
            throw new Error("User not found or update failed");
        }

        // Success Response
        return response.json({
            message: "Upload successfully",
            data: {
                _id: userId,
                avatar: upload.url,
            },
            error: false,
            success: true,
        });
    } catch (error) {
        console.error("Error in uploadAvatarController:", error); // Log error details
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

//update user details
export async function updateUserDetails(request, response) {
    try {
        const { name, email, number, password} = request.body
        const userId = request.userId

        let hashPassword = ""
        if(password){
            const salt = await bcryptjs.genSalt(10)
            hashPassword = await bcryptjs.hash(password, salt)
        }

        const updateUser = await UserModel.updateOne({ _id : userId }, {
            ...(name && {name : name}),
            ...(email && {email : email}),
            ...(number && {number : number}),
            ...(password && {password : hashPassword})
        })

        return response.json({
            message : "Userdata uploaded successfully",
            error : false,
            success : true,
            data : updateUser 
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            false : false
        })
    }
}

//forgot password !login
export async function forgotPasswordController(request, response) {
    try
    {
    const { email } = request.body 

    const user = await UserModel.findOne({ email })

    if(!user){
        return response.status(400).json({
            message : "Email not available",
            error : true,
            success : false
        })
    }

    const otp = generateOTP()
    const expireTime = new Date() + 60 * 60 * 1000 // 1hr

    const update = await UserModel.findByIdAndUpdate(user._id,{
        forgot_password_otp : otp,
        forgot_password_expiry : new Date(expireTime).toISOString()
    })

    await sendEmail({
        to : email,
        subject : "Forgot password from Shoply",
        html : forgotPasswordTemplate({
            name : user.name,
            otp : otp
        })
    })

    return response.json({
        message : "check your email",
        error : false,
        success : true
    })

} catch (error) {
    return response.status(500).json({
        message : error.message || error,
        error : true,
        success : false
    })
}
}

//verify forgot otp
export async function verifyForgotPasswordOTP(request, response) {
    try {
        const { email, otp } = request.body;

        const user = await UserModel.findOne({ email });

        if(!email || !otp) {
            return response.status(400).json({
                message: "Provide required field, Email and Otp",
                error: true,
                success: false
            });
        }
        
        if(!user){
            return response.status(400).json({
                message: "Email not found",
                error: true,
                success: false
            })
        };

        const currentTime = new Date();
        if(user.forgot_password_expiry > currentTime) {
            return response.status(400).json({
                message: "OTP expired",
                error: true, 
                success: false
            });
        }

        if(otp !== user.forgot_password_otp) {
            return response.status(400).json({
                message: "Invalid OTP",
                error: true,
                success: false
            });
        }

        return response.json({
            message: "OTP verified successfully!",
            error: false,
            success: true
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//reset the password
export async function resetPassword(request, response) {
    try {
        const { email, newPassword, confirmPassword } = request.body;

        if(!email || !newPassword || !confirmPassword) {
            return response.status(400).json({
                message: "Provide email and new password and confirm password",
                error: true,
                password: false
            });
        }

        const user = await UserModel.findOne({ email })

        if(!email ){
            return response.status(400).json({
                message : "Email not found",
                error: true,
                success: false
            });
        }

        if(newPassword !== confirmPassword) {
            return response.status(400).json({
                message: "Password do not match",
                error: true,
                success: false
            });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(newPassword, salt);

        const update = await UserModel.findByIdAndUpdate(user._id, {
            password : hashPassword
        })

        return response.json({
            message: "Password updated successfully!",
            error: false,
            success: true
        })


    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: false,
            suceess: true
        })
    }
}

//refresh token controller
export async function refreshToken(request, response) {
    try {
        const refreshToken = request.cookies.refreshToken || request?.header?.authorization?.split(" ")[1];

        if(!refreshToken) {
            return response.status(400).json({
                message: "Invalid token",
                error: true,
                success: false
            });
        }

        const verifyToken = await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN);

        if(!verifyToken) {
            return response.status(401).json({
                message: "Token expired",
                error: true,
                success: false
            })
        }

        const userId = verifyToken?._id

        const newAccessToken = await generateAccessToken(userId)

         //save token to cookie
         const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        response.cookie("accessToken", newAccessToken, cookieOption);

        return response.json({
            message: "New accesstoken generated",
            error: false,
            success: true,
            data: {
                accessToken: newAccessToken
            }
        })


    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}