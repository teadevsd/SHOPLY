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
import crypto from "crypto"
import fetchUserDetails from "../../frontend/src/utilitis/fetchUserDetails.js"


//register user controller
export async function registerUserController(request, response) {
    try {
        const { firstName, lastName, email, password, phoneNumber, state, city } = request.body;

        if (!firstName || !lastName || !email || !password) {
            return response.status(400).json({
                message: "Provide required credentials!",
                error: true,
                success: false
            });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return response.status(400).json({
                message: "Email already registered",
                error: true,
                success: false
            });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        const verificationCode = crypto.randomBytes(16).toString("hex");
        const newUser = new UserModel({
            firstName,
            lastName,
            email,
            password: hashPassword,
            phoneNumber,
            state,
            city,
            verify_email: false,
            verify_email_code: verificationCode,
        });

        await newUser.save().catch((err) => {
            console.error("Error saving user:", err);
            throw new Error("User registration failed");
        });

        const verifyEmailUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/verify-email?codes=${verificationCode}`;

        try {
            await sendEmail({
                to: email,
                subject: "Verify email from Shoply!",
                html: verifyEmailTemplate({
                    firstName,
                    url: verifyEmailUrl,
                }),
            });
        } catch (emailError) {
            console.error("Email Sending Error:", emailError);
            throw new Error("Failed to send verification email");
        }

        return response.json({
            message: "Successfully registered! Please check your email to verify your account.",
            error: false,
            success: true,
            data: newUser,
        });

    } catch (error) {
        console.error("Registration Error:", error);
        return response.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            success: false,
        });
    }
}


// verify user controller
export async function verifyEmailController(request, response) {
    try {
        const { code } = request.query; // Get the verification code from the query string

        if (!code) {
            return response.status(400).json({
                message: "Verification code is required.",
                error: true,
                success: false
            });
        }

        // Find the user based on the verification code (verify_email_code)
        const user = await UserModel.findOne({ verify_email_code: code });

        if (!user) {
            return response.status(400).json({
                message: "Invalid verification code.",
                error: true,
                success: false
            });
        }

        // Update the user's verification status
        const updateUser = await UserModel.updateOne({ _id: user._id }, {
            $set: { verify_email: true },
            $unset: { verify_email_code: 1 }  // Optionally remove the verification code after it's used
        });

        const updatedUser = await UserModel.findOne({ _id: user._id });
        if (!updatedUser.verify_email) {
            return response.status(500).json({
                message: "Verification status update failed.",
                error: true,
                success: false
            });
        }

        if (!updateUser.nModified) {
            return response.status(400).json({
                message: "Verification status could not be updated.",
                error: true,
                success: false
            });
        }

        // Send successful response to frontend
        return response.status(200).json({
            message: "Email verified successfully.",
            error: false,
            success: true,
            data: { redirectUrl: `${process.env.FRONTEND_URL}/verify-email` }
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || "Internal server error.",
            error: true,
            success: false
        });
    }
}

 
//login user controller 
export async function loginController(request, response) {
    try {
        const { email, password } = request.body;

        if (!email || !password) {
            return response.status(400).json({ message: "Provide both email and password", error: true, success: false });
        }

        const user = await UserModel.findOne({ email });
        if (!user || !(await bcryptjs.compare(password, user.password))) {
            return response.status(400).json({ message: "Invalid email or password", error: true, success: false });
        }

       

        if (user.status !== "Active") {
            return response.status(400).json({ message: "Your account is not active. Please contact support.", error: true, success: false });
        }

        const token = await generateAccessToken(user._id);
        const refreshToken = await generateRefreshToken(user._id);

        const update = await UserModel.findByIdAndUpdate(user?._id, {
            last_login_date: new Date()
        })
        
        response.cookie("accessToken", token, { httpOnly: true, secure: false, sameSite: "lax" });
        response.cookie("refreshToken", refreshToken, { httpOnly: true, secure: false, sameSite: "lax" });

        const userDetails = await fetchUserDetails()

        return response.json({
            message: "Login successful",
            error: false,
            success: true,
            data: { accessToken: token, refreshToken },
        });

    } catch (error) {
        console.error("Error during login:", error);
        return response.status(500).json({ message: "Internal Server Error", error: true, success: false });
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
        const { firstName, lastName, email, phoneNumber, password} = request.body
        const userId = request.userId

        let hashPassword = ""
        if(password){
            const salt = await bcryptjs.genSalt(10)
            hashPassword = await bcryptjs.hash(password, salt)
        }

        const updateUser = await UserModel.updateOne({ _id : userId }, {
            ...(firstName && {firstName : firstName}),
            ...(lastName && {lastName : lastName}),
            ...(email && {email : email}),
            ...(phoneNumber && {phoneNumber : phoneNumber}),
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
    try {
      const { email } = request.body;
  
      // Validate if email is provided
      if (!email) {
        return response.status(400).json({
          message: "Email is required",
          error: true,
          success: false,
        });
      }
  
      // Check if the user exists
      const user = await UserModel.findOne({ email });
      if (!user) {
        return response.status(400).json({
          message: "Email not available",
          error: true,
          success: false,
        });
      }
  
      // Generate OTP and set expiry time
      const otp = generateOTP(); // Assuming this generates a 4-6 digit OTP
      const expireTime = Date.now() + 10 * 60 * 1000; // 10 minutes from now
  
      // Update user's forgot_password_otp and forgot_password_expiry fields
      user.forgot_password_otp = otp.toString(); // Store OTP as a string
      user.forgot_password_expiry = new Date(expireTime); // Store expiry as Date
      await user.save();
  
      // Send OTP via email
      console.log("OTP:", otp); 

      await sendEmail({
        to: email,
        subject: "Forgot Password from Shoply",
        html: forgotPasswordTemplate({
          firstName: user.firstName,
          otp: otp, // Assuming otp is an object and the OTP value is stored in otp.otp
        }),
      });
      
  
      return response.status(200).json({
        message: "Check your email for the OTP",
        error: false,
        success: true,
      });
    } catch (error) {
      return response.status(500).json({
        message: error.message || error,
        error: true,
        success: false,
      });
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
        if (user.forgot_password_expiry < currentTime) {
            return response.status(400).json({
                message: "OTP expired",
                error: true, 
                success: false
            });
        }

        console.log("Received OTP:", otp);
        console.log("Stored OTP:", user.forgot_password_otp);
        console.log("Received OTP Type:", typeof otp); // Should be string or number
        console.log("Stored OTP Type:", typeof user.forgot_password_otp); // Should match
        
        
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

        // Check if required fields are provided
        if (!email || !newPassword || !confirmPassword) {
            return response.status(400).json({
                message: "Provide email, new password, and confirm password",
                error: true,
                success: false
            });
        }

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return response.status(400).json({
                message: "Email not found",
                error: true,
                success: false
            });
        }

        // Check if passwords match
        if (newPassword !== confirmPassword) {
            return response.status(400).json({
                message: "Passwords do not match",
                error: true,
                success: false
            });
        }

        // Hash the new password
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(newPassword, salt);

        // Log the hash for debugging purposes
        console.log("Hashed password:", hashPassword);

        // Update the user's password
        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: user._id },
            { password: hashPassword },
            { new: true }  // Ensure we get the updated document
        );

        // Check if the update was successful
        if (!updatedUser) {
            return response.status(400).json({
                message: "Error updating password",
                error: true,
                success: false
            });
        }

        // Send success response
        return response.json({
            message: "Password updated successfully!",
            error: false,
            success: true
        });

    } catch (error) {
        console.error("Error resetting password:", error);  // Log the error for debugging

        return response.status(500).json({
            message: error.message || "Internal server error",
            error: true,
            success: false
        });
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

//get user details
export const getUserDetails = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({ message: "User ID not found", success: false });
        }

        
        const user = await UserModel.findById(userId)
            .select('-password -refresh_token')
            .populate('address_details') 
            .populate('shopping_cart')   
            .populate('ordeHistory');    
            
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        return res.status(200).json({
            message: "User details fetched successfully",
            success: true,
            data: user,
        });
    } catch (error) {
        console.error("Error fetching user details:", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

