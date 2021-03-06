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

// 按学科部查询专业信息
export const systemSearchMajorByDid = (d_id) => { return $axios.get(`/system/searchMajorByDid?d_id=${d_id}`) }

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

// 学生查询上传的开题报告
export const getMyOpeningReport = (sno) => { return $axios.get(`/student/getMyOpeningReport?sno=${sno}`) }

// 学生下载开题报告
export const downloadOpeningReport = (id) => { return $axios.get(`/student/downloadOpeningReport?id=${id}`, { responseType: 'arraybuffer' }) }

// 学生删除开题报告
export const deleteOpeningReport = (id) => { return $axios.get(`/student/deleteOpeningReport?id=${id}`) }

// 学生查询我的导师学号
export const selectTutorTno = (sno) => { return $axios.get(`/student/selectTutorTno?sno=${sno}`) }

// 查询文献翻译是否存在
export const selectTranslationExist = (sno) => { return $axios.get(`/student/searchTranslationExist?sno=${sno}`) }

// 学生上传文献翻译
export const uploadTranslation = (data) => { return $axios.post("/student/uploadTranslation", data) }

// 学生更新文献翻译
export const updateTranslation = (data) => { return $axios.post("/student/updateTranslation", data) }

// 学生查询文献翻译内容
export const selectTranslation = (sno) => { return $axios.post(`/student/searchTranslation?sno=${sno}`) }

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

// 导师获取自己发布的所有课题信息
export const tutorGetMyPublishProject = (tutorId) => { return $axios.get(`/tutor/myPublishProject?tutorId=${tutorId}`) }

// 导师查询选择自己课题的所有的学生的学号和姓名
export const tutorSearchStudentSnoName = (tno) => { return $axios.get(`/tutor/searchStudentSnoName?tno=${tno}`) }

// 导师获取自己学生的所有开题报告
export const tutorSearchAllReport = (tno) => { return $axios.get(`/tutor/searchAllReport?tno=${tno}`) }

// 导师按学生学号获取开题报告
export const tutorGetReportBySno = (sno) => { return $axios.get(`/tutor/getReportBySno?sno=${sno}`) }

// 导师点评开题报告
export const tutorUpdateReport = (id, data) => { return $axios.post("/tutor/updateOpeningReport", { id, ...data }) }

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

// 管理员新增公告
export const adminAddNotice = (data) => { return $axios.post("/admin/addNotice", data) }

// 管理员修改公告
export const adminChangeNotice = (data) => { return $axios.post("/admin/changeNotice", data) }

// 管理员删除公告
export const adminDeleteNotice = (id) => { return $axios.get(`/admin/deleteNotice?id=${id}`) }

// 管理员新增专业
export const adminAddMajor = (data) => { return $axios.post("/admin/addMajor", data) }

// 管理员修改专业
export const adminChangeMajor = (data) => { return $axios.post("/admin/changeMajor", data) }

// 管理员删除专业
export const adminDeleteMajor = (id) => { return $axios.get(`/admin/deleteMajor?id=${id}`) }

