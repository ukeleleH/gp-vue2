import VueRouter from "vue-router"
import Profile from "../pages/Profile/Profile.vue"
import AllProject from "../pages/AllProject/AllProject.vue"
import MyProject from "../pages/MyProject/MyProject.vue"
import HasPublishedProject from "../pages/HasPublishedProject/HasPublishedProject.vue"
import OpeningReport from "../pages/OpeningReport/OpeningReport.vue"
import DocumentTranslation from "../pages/DocumentTranslation/DocumentTranslation.vue"
import DatabaseDesign from "../pages/DatabaseDesign/DatabaseDesign.vue"
import StudentManage from "../pages/StudentManage/StudentManage.vue"
import TutorManage from "../pages/TutorManage/TutorManage.vue"

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default new VueRouter({
    routes: [
        { path: "/profile", component: Profile },
        { path: "/all_project", component: AllProject },
        { path: "/my_project", component: MyProject },
        { path: "/has_published_project", component: HasPublishedProject },
        { path: "/opening_report", component: OpeningReport },
        { path: "/document_translation", component: DocumentTranslation },
        { path: "/database_design", component: DatabaseDesign },
        { path: "/student_manage", component: StudentManage },
        { path: "/tutor_manage", component: TutorManage },
    ]
})