/* 
    对接口地址的统一管理
*/
import $axios from './request'

// 获取左侧公告的接口
export const requireLeftNotice = () => { return $axios.get("/student/leftNotice") }

// 学生登录
export const studentLogin = (data) => { return $axios.post("/student/login", data) }