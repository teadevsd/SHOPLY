// var express = require('express');
// var userRouter = express();
// import UserModel from "../models/user.models.js";

// Email verification route
// userRouter.get('/verify-email', async (req, res) => {
//     try {
//         const verificationCode = req.query.codes;

//         if (!verificationCode) {
//             return res.status(400).json({ message: 'Verification code is required.', error: true });
//         }

//         console.log('Received Verification Code:', verificationCode);

//         // Find the user with the provided verification code
//         const user = await UserModel.findOne({ verify_email_code: verificationCode });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid or expired verification code.', error: true });
//         }

//         // Manually update the user verification status
//         user.verify_email = true;
//         user.verify_email_code = null;
//         const savedUser = await user.save();

//         console.log('Saved User:', savedUser);  // Check if saved successfully

//         return res.status(200).json({ message: 'Email verified successfully. You can now log in.', error: false });
//     } catch (error) {
//         console.error('Error during email verification:', error);
//         return res.status(500).json({ message: 'Internal server error.', error: true });
//     }
// });

var express = require('express');
var userRouter = express();
import UserModel from "../models/user.models.js";

// Globally verify all users' emails
userRouter.post('/verify-all-emails', async (req, res) => {
    try {
        // Update all users to set verify_email to true
        const result = await UserModel.updateMany(
            {}, // No filter, applies to all documents
            {
                $set: { verify_email: true }, // Set verify_email to true
                $unset: { verify_email_code: 1 } // Optionally remove the verification code
            }
        );

        return res.status(200).json({
            message: `Successfully updated ${result.modifiedCount} users.`,
            error: false,
            success: true
        });
    } catch (error) {
        console.error('Error during global email verification:', error);
        return res.status(500).json({
            message: 'Internal server error.',
            error: true,
            success: false
        });
    }
});

export default userRouter;

 


