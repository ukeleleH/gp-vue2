import VueRouter from "vue-router"
import Profile from "@/pages/Profile/Profile.vue"
import AllProject from "@/pages/AllProject/AllProject.vue"
import ProjectDetail from "@/pages/AllProject/ProjectDetail/ProjectDetail.vue"
import MyProject from "@/pages/MyProject/MyProject.vue"
import HasPublishedProject from "@/pages/HasPublishedProject/HasPublishedProject.vue"
import OpeningReport from "@/pages/OpeningReport/OpeningReport.vue"
import DocumentTranslation from "@/pages/DocumentTranslation/DocumentTranslation.vue"
import DatabaseDesign from "@/pages/DatabaseDesign/DatabaseDesign.vue"
import StudentManage from "@/pages/StudentManage/StudentManage.vue"
import TutorManage from "@/pages/TutorManage/TutorManage.vue"
import NotFound from "@/components/NotFound.vue"

import { MessageBox } from 'element-ui'

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: "/profile", component: Profile },
        {
            path: "/all_project",
            component: AllProject,
            children: [{
                name: 'projectDetail',
                path: "project_detail/:content/:demand/:id/:name/:nature/:source/:studentId/:tutor/:tutorId",
                component: ProjectDetail
            }]
        },
        { path: "/my_project", component: MyProject },
        { path: "/has_published_project", component: HasPublishedProject },
        { path: "/opening_report", component: OpeningReport },
        { path: "/document_translation", component: DocumentTranslation },
        { path: "/database_design", component: DatabaseDesign },
        { path: "/student_manage", component: StudentManage },
        { path: "/tutor_manage", component: TutorManage },
    ]
})

// 全局前置守卫
router.beforeEach((to, _, next) => {
    let loginInformation = JSON.parse(localStorage.getItem("loginInformation"))
    if (loginInformation) {
        let { identity } = loginInformation
        if ((identity !== 2 && to.path === '/has_published_project') ||
            (identity !== 3 && to.path === '/student_manage') ||
            (identity !== 3 && to.path === '/tutor_manage')) {
            MessageBox.alert("对不起，您暂无权限访问 ！", "提示", {
                type: "warning",
                confirmButtonText: "确定",
                center: true,
            });
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router