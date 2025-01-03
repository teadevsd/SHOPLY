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
    }

}

export default SummaryAPI