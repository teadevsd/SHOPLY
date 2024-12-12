import { Router } from "express";
import { forgotPasswordController, loginController, logOutController, refreshToken, registerUserController, resetPassword, updateUserDetails, uploadAvatarController, verifyEmailController, verifyForgotPasswordOTP } from "../controller/usercontroller.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";



const userRouter = Router();

userRouter.post('/register', registerUserController);
userRouter.post('/verify-email', verifyEmailController);
userRouter.post('/login', loginController);
userRouter.post('/logout', auth, logOutController);
userRouter.put('/upload-avatar', auth, upload.single('avatar'), uploadAvatarController);
userRouter.put('/update-user', auth, updateUserDetails);
userRouter.put('/forgot-password', forgotPasswordController);
userRouter.put('/verify-forgot-password-OTP', verifyForgotPasswordOTP);
userRouter.patch('/reset-password', resetPassword);
userRouter.post('/refresh-token', refreshToken);



export default userRouter