var express = require('express');
var userRouter = express();
var UserModel = require('./models/User'); // Adjust the path to your User model

// Email verification route
userRouter.get('/verify-email', function(req, res) {
    var verificationCode = req.query.codes; // The code sent to the user via email

    // Find the user by the verification code
    UserModel.findOne({ 'verify_email_code': verificationCode })
        .then(function(user) {
            if (!user) {
                return res.status(400).json({ message: 'Invalid or expired verification code' });
            }

            // Update the user's verify_email field to true
            user.verify_email = true;
            user.verify_email_code = null; // Remove verification code after successful verification

            // Save the updated user document
            return user.save();
        })
        .then(function() {
            // Send success message after successfully updating the user's email status
            res.json({ message: 'Email verified successfully. You can now log in.' });
        })
        .catch(function(error) {
            console.error('Error during email verification:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
});

export default userRouter