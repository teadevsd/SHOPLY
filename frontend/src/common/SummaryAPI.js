export const baseURL = "http://localhost:4040";

const SummaryAPI = { 
    register : {
        url : '/api/v1/user/register',
        method : 'post'
    },
    login  : {
        url : '/api/v1/user/login',
        method : 'post'
    },
    verifyEmail: {
        url : '/api/v1/user/verified-successfully',
        method : 'post'
    },
    forgotPassword: {
        url : 'api/v1/user/forgot-password',
        method : 'put'
    },
    otpVerification: {
        url : 'api/v1/user/verify-forgot-password-OTP',
        method : 'put'
    },
    resendOtp: {
        url : 'api/v1/user/resend-otp',
        method : 'post'
    },
    resetPassword: {
        url : 'api/v1/user/reset-password',
        method : 'patch'
    },
    refreshToken: {
        url : 'api/v1/user/refresh-token',
        method : 'post'
    },
    userDetails: {
        url : 'api/v1/user/user-details',	
        method : 'get'
    },
    addCategory: {
        url : 'api/v1/admin/add-category',
        method : 'post'
    },
    getAllCategory: {
        url: 'api/v1/admin/get-all-category',
        method: 'get'
    },
    uploadImage: {
        url : 'api/v1/file/upload',
        method : 'post'
    },
    updateCategory: {
        url: 'api/v1/admin/update-category',
        method: 'put'
    }

}

export default SummaryAPI