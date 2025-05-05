import axios from 'axios'

// https://www.axios-http.cn/docs/instance
const service = axios.create({
    // import.meta.env 中存储了.env 文件定义的常量
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 2000,
})

export default service
