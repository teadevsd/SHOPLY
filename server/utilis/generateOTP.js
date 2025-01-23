import sendEmail from "../config/sendEmail.js";
import UserModel from "../models/user.models.js";


const generateOTP = () => {
  const otp = Math.floor(1000 + Math.random() * 9000); // Range: 1000 - 9999
  const expiresAt = new Date().getTime() + 10 * 60 * 1000; // 10 minutes in milliseconds
  return otp.toString(); // Return only OTP as a string
}


export default generateOTP

export async function resendOTP(request, response) {
  try {
      const { email } = request.body;
      
      // Check if email is provided in the request body
      if (!email) {
          return response.status(400).json({
              message: "Email is required",
              error: true,
              success: false
          });
      }

      // Find the user by email
      const user = await UserModel.findOne({ email });

      if (!user) {
          return response.status(400).json({
              message: "Email not found",
              error: true,
              success: false
          });
      }

      // Generate OTP and set its expiry time
      const otp = generateOTP(); // Generate OTP as a string
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

      // Update the user's OTP and expiry time
      user.forgot_password_otp = otp;  // Store OTP as a string
      user.forgot_password_expiry = otpExpiry;  // Save the expiry time

      // Save the updated user information
      await user.save();

      // Send OTP via email
      await sendEmail(email, otp); // Send OTP as a string

      // Send success response
      return response.status(200).json({
          message: "OTP sent successfully",
          error: false,
          success: true
      });

  } catch (error) {
      console.error("Error while resending OTP:", error); // Log the error for debugging
      
      return response.status(500).json({
          message: error.message || "An error occurred while resending OTP",
          error: true,
          success: false
      });
  }
}

