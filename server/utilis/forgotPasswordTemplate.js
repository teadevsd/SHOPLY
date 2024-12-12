const forgotPasswordTemplate = ({ name, otp})=>{
    return`
        <div>
            <p>Dear, ${name}</p>
            <p>You requested for a password reset, please use the following OTP code to reset your password.</p>

            <div style = "background: orange; font-size: 20px; padding: 20px; text-align: center; font-weight: 600;">${otp}</div>
            <p>This OTP is valid for 1 Hour only. Enter this code in the Shoply webside to proceed with resetting your password!.</p>

            <br/>
            <br/>

            <p>Thanks<p/>
            <p>Shoply<p/>
        </div>
    
    `
}
export default forgotPasswordTemplate