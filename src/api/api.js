/* 
    对接口地址的统一管理
*/
import $axios from './request'

// 获取左侧公告的接口
export const requireLeftNotice = () => { return $axios.get("/student/leftNotice") }

// 学生登录
export const studentLogin = (data) => { return $axios.post("/student/login", data) }

// 导师登录
export const tutorLogin = (data) => { return $axios.post("/tutor/login", data) }

// 管理员登录
export const adminLogin = (data) => { return $axios.post("/admin/login", data) }

// 查询学生选择的毕业设计题目
export const getStudentProject = (id) => { return $axios.get(`/student/sProject?id=${id}`) }

// 学生修改密码
export const studentChangePassword = (id, password) => { return $axios.get(`/student/changePassword?id=${id}&password=${password}`) }

// 导师修改密码
export const tutorChangePassword = (id, password) => { return $axios.get(`/tutor/changePassword?id=${id}&password=${password}`) }

// 查询本系全部课题信息
export const getAllProject = () => { return $axios.get("/student/allProject") }

// 查询每个课题对应的导师名字
export const getAllProjectOfTutor = () => { return $axios.get("/student/allProjectOfTutor") }

// 学生选择课题
export const studentChooseProject = (data) => { return $axios.post("/student/chooseProject", data) }

// 查询学生选择的课题信息
export const getMyProject = (id) => { return $axios.get(`/student/myProject?id=${id}`) }

// 查询学生所选课题的导师信息
export const getMyProjectTutor = (tutorId) => { return $axios.get(`/student/myProjectTutor?tutorId=${tutorId}`) }

// 导师删除课题
export const tutorDeleteProject = (id) => { return $axios.get(`/tutor/deleteProject?id=${id}`) }

// 导师（发布，修改）选题时，查询题目是否是我唯一的
export const tutorIsUniqueProjectName = (name) => { return $axios.get(`/tutor/isUniqueProjectName?name=${name}`) }

// 导师修改课题
export const tutorChangeProjectInfo = (data) => { return $axios.post(`/tutor/changeProjectInfo`, data) }

// 导师发布课题
export const tutorPublishNewProject = (data) => { return $axios.post(`/tutor/publishNewProject`, data) }

// 获取导师发布的所有课题信息
export const tutorGetMyPublishProject = (id) => { return $axios.get(`/tutor/myPublishProject?id=${id}`) }








