import request from '@/utils/request.js'

export const userRegisterService = (registerData)=>{
    const params = new URLSearchParams()
    for(let key in registerData){
        params.append(key,registerData[key])
    }
    return request.post('/user/register', params)
}
export const userLoginService = (LoginData)=>{
    const params = new URLSearchParams()
    for(let key in LoginData){
        params.append(key,LoginData[key])
    }
    return request.post('/user/login', params)
}

export const sendVerificationCode = (email) => {
    console.log(`Sending request to /api/send-verification-code with email: ${email}`);
    return request.post('/user/send-verification-code', null, { params: { email } });
};

export const checkEmailAccount = (account) => {
    console.log(`Checking email account with email: ${account}`);
    return request.post('/user/check-email-account', null, { params: { account } });
}

export const checkVerificationCode = (account, verificationCode) => {
    console.log(`Checking verification code with code: ${verificationCode} to ${account}`);
    return request.post('/user/check-verification-code', null, { params: { account, verificationCode } });
}

export const resetPassword = (account, password) => {
    console.log(`Resetting password with account: ${account} and new password: ${password}`);
    return request.post('/user/reset-password', null, { params: { account, password } });
}