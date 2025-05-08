import request from '@/utils/request'

// 登录方法
export function login(loginForm: LoginForm) {
    return request({
        url: '/login',
        // headers: {
        //     isToken: false,
        // },
        method: 'POST',
        data: loginForm,
        withCredentials: true, // 发送的请求会携带cookie
    })
}

// 退出方法
export function logout() {
    return request({
        url: '/logout',
        method: 'post',
    })
}

// 获取验证码
export function getCodeImg() {
    return request({
        url: '/captchaImage',
        responseType: 'blob',
        method: 'GET',
        timeout: 2000,
        withCredentials: true, // 设置为true才会自动存储返回的cookie
    })
}
