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
export const getStudentProject = (studentId) => { return $axios.get(`/student/sProject?studentId=${studentId}`) }

// 查询学生可重选的次数
export const getStudentOpportunity = (sno) => { return $axios.get(`/student/getOpportunity?sno=${sno}`) }

// 更新学生可重选的次数
export const updateStudentOpportunity = (sno) => { return $axios.get(`/student/updateOpportunity?sno=${sno}`) }

// 更新学生已选课题的信息
export const studentUpdateHasChooseProject = (studentId) => { return $axios.get(`/student/updateHasChooseProject?studentId=${studentId}`) }

// 查询学科部信息
export const systemSearchDepartment = () => { return $axios.get("/system/searchDepartment") }

// 查询专业信息
export const systemSearchMajor = () => { return $axios.get("/system/searchMajor") }

// 查询班级信息
export const systemSearchClass = (type) => { return $axios.get(`/system/searchClass?limitNum=${type}`) }

// 学生修改个人信息
export const studentChangeProfile = (data) => { return $axios.post("/student/changeProfile", data) }

// 导师修改个人信息
export const tutorChangeProfile = (data) => { return $axios.post("/tutor/changeProfile", data) }

// 学生修改密码
export const studentChangePassword = (account, password) => { return $axios.get(`/student/changePassword?account=${account}&password=${password}`) }

// 导师修改密码
export const tutorChangePassword = (account, password) => { return $axios.get(`/tutor/changePassword?account=${account}&password=${password}`) }

// 查询本系全部课题信息
export const getAllProject = () => { return $axios.get("/student/allProject") }

// 查询每个课题对应的导师名字
export const getAllProjectOfTutor = () => { return $axios.get("/student/allProjectOfTutor") }

// 学生选择课题
export const studentChooseProject = (data) => { return $axios.post("/student/chooseProject", data) }

// 查询学生选择的课题信息
export const getMyProject = (studentId) => { return $axios.get(`/student/myProject?studentId=${studentId}`) }

// 查询学生所选课题的导师信息
export const getMyProjectTutor = (tno) => { return $axios.get(`/student/myProjectTutor?tno=${tno}`) }

// 查询课题详情里的学生信息
export const getStudentData = (sno) => { return $axios.get(`/student/getStudentData?sno=${sno}`) }

// 导师删除课题
export const tutorDeleteProject = (id) => { return $axios.get(`/tutor/deleteProject?id=${id}`) }

// 导师（发布，修改）选题时，查询题目是否是我唯一的
export const tutorIsUniqueProjectName = (name) => { return $axios.get(`/tutor/isUniqueProjectName?name=${name}`) }

// 导师修改课题
export const tutorChangeProjectInfo = (data) => { return $axios.post(`/tutor/changeProjectInfo`, data) }

// 导师发布课题
export const tutorPublishNewProject = (data) => { return $axios.post(`/tutor/publishNewProject`, data) }

// 获取导师发布的所有课题信息
export const tutorGetMyPublishProject = (tutorId) => { return $axios.get(`/tutor/myPublishProject?tutorId=${tutorId}`) }

// 管理员查询全部学生
export const adminSelectAllStudent = () => { return $axios.get("/admin/selectAllStudent") }

// 管理员查询全部导师
export const adminSelectAllTutor = () => { return $axios.get("/admin/selectAllTutor") }

// 管理员查询学生学号是否唯一
export const adminIsUniqueStudentId = (sno) => { return $axios.get(`/admin/isUniqueStudentId?sno=${sno}`) }

// 管理员删除学生信息
export const adminDeleteStudent = (id) => { return $axios.get(`/admin/deleteStudent?id=${id}`) }

// 管理员新增学生信息
export const adminAddStudent = (data) => { return $axios.post("/admin/addStudent", data) }

// 管理员修改学生信息
export const adminChangeStudent = (data) => { return $axios.post("/admin/changeStudent", data) }

// 管理员查询导师学号是否唯一
export const adminIsUniqueTutorId = (tno) => { return $axios.get(`/admin/isUniqueTutorId?tno=${tno}`) }

// 管理员删除导师信息
export const adminDeleteTutor = (id) => { return $axios.get(`/admin/deleteTutor?id=${id}`) }

// 管理员新增导师信息
export const adminAddTutor = (data) => { return $axios.post("/admin/addTutor", data) }

// 管理员修改导师信息
export const adminChangeTutor = (data) => { return $axios.post("/admin/changeTutor", data) }
