const verifyEmailTemplate = ({ firstName, url }) => {
    return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <p>Dear ${firstName},</p>
        <p>Thank you for registering on Shoply. Please verify your email by clicking the button below:</p>
        <a href="${url}" style="color: white; background: orange; margin-top: 10px; padding: 10px 20px; text-decoration: none; display: inline-block; border-radius: 5px;">
            Verify Email
        </a>
        <p>If you did not sign up for Shoply, please ignore this email.</p>
    </div>
    `;
};

export default verifyEmailTemplate;
