/* 
    对 axios 实现二次封装
*/

// 引入 axios 
import axios from "axios";
// 引入 nprogress 进度条
import nprogress from "nprogress";
// 引入进度条的样式
import "nprogress/nprogress.css"

// const root = process.env.baseURL

// 创建 axios 的实例
const instance = axios.create({
    baseURL: '/api/gp',
    timeout: 3000
})

// 配置请求拦截器
instance.interceptors.request.use((config) => {
    // 开启进度条
    nprogress.start()
    return config
})

// 配置响应拦截器
instance.interceptors.response.use((res) => {
    // 关闭进度条
    nprogress.done()
    return res.data
}, (err) => {
    return Promise.reject(err);
})


// 暴露二次封装的 axios 
export default instance

