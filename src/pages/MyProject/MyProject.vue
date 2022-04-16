<template>
    <div class="my_project_wrap">
        <!-- 我的课题信息 -->
        <el-descriptions title="我的课题" :column="3" border>
            <el-descriptions-item
                label="课题ID"
                :labelStyle="descLabelStyle"
                :contentStyle="descContentStyle"
            >
                {{ myProject.id }}
            </el-descriptions-item>
            <el-descriptions-item
                label="名称"
                :labelStyle="descLabelStyle"
                :contentStyle="descContentStyle"
            >
                {{ myProject.name }}
            </el-descriptions-item>
            <el-descriptions-item
                label="内容"
                :labelStyle="descLabelStyle"
                :contentStyle="descContentStyle"
            >
                {{ myProject.content }}
            </el-descriptions-item>
            <el-descriptions-item
                label="所属导师"
                :labelStyle="descLabelStyle"
                :contentStyle="descContentStyle"
            >
                {{ myProject.tutorId }}
            </el-descriptions-item>
            <el-descriptions-item
                label="性质"
                :labelStyle="descLabelStyle"
                :contentStyle="descContentStyle"
            >
                {{ myProject.nature }}
            </el-descriptions-item>
            <el-descriptions-item
                label="来源"
                :labelStyle="descLabelStyle"
                :contentStyle="descContentStyle"
            >
                {{ myProject.source }}
            </el-descriptions-item>
            <el-descriptions-item
                label="要求"
                :span="3"
                :labelStyle="descLabelStyle"
                :contentStyle="descContentStyle"
            >
                {{ myProject.demand }}
            </el-descriptions-item>
        </el-descriptions>
        <!-- 我的导师信息 -->
        <el-descriptions
            title="我的导师"
            :column="3"
            border
            style="margin-top: 50px"
        >
            <el-descriptions-item
                label="姓名"
                :labelStyle="descLabelStyle"
                :contentStyle="descContentStyle"
            >
                {{ tutorData.name }}
            </el-descriptions-item>
            <el-descriptions-item
                label="性别"
                :labelStyle="descLabelStyle"
                :contentStyle="descContentStyle"
            >
                {{ tutorData.gender }}
            </el-descriptions-item>
            <el-descriptions-item
                label="职称"
                :labelStyle="descLabelStyle"
                :contentStyle="descContentStyle"
            >
                {{ tutorData.title }}
            </el-descriptions-item>
            <el-descriptions-item
                label="学位"
                :labelStyle="descLabelStyle"
                :contentStyle="descContentStyle"
            >
                {{ tutorData.degree }}
            </el-descriptions-item>
            <el-descriptions-item
                label="电话"
                :labelStyle="descLabelStyle"
                :contentStyle="descContentStyle"
            >
                {{ tutorData.tel }}
            </el-descriptions-item>
            <el-descriptions-item
                label="QQ"
                :labelStyle="descLabelStyle"
                :contentStyle="descContentStyle"
            >
                {{ tutorData.qq }}
            </el-descriptions-item>
            <el-descriptions-item
                label="校内/校外"
                :labelStyle="descLabelStyle"
                :contentStyle="descContentStyle"
            >
                {{ tutorData.isInsideSchool ? "本校导师" : "校外聘请" }}
            </el-descriptions-item>
            <el-descriptions-item
                label="介绍"
                :labelStyle="descLabelStyle"
                :contentStyle="descContentStyle"
            >
                {{ tutorData.introduction }}
            </el-descriptions-item>
        </el-descriptions>
    </div>
</template>

<script>
    import { getMyProject, getMyProjectTutor } from "@/api/api";
    import { MessageBox } from "element-ui";
    export default {
        name: "MyProject",
        data() {
            return {
                // 我的课题信息
                myProject: {},
                // 导师信息
                tutorData: {},
                // 描述列表标签样式
                descLabelStyle: {
                    width: "200px",
                },
                // 描述列表内容样式
                descContentStyle: {
                    width: "300px",
                },
            };
        },
        methods: {
            async getMyProject() {
                const loginInformation = localStorage.getItem("loginInformation");
                const { id } = JSON.parse(loginInformation);
                // 发送请求, 获取我的课题信息
                let myProjectData = await getMyProject(id);
                // 如果存在课题信息
                if (myProjectData) {
                    this.myProject = myProjectData;
                    const { tutorId } = myProjectData;
                    // 发送请求, 获取我的导师信息
                    let data = await getMyProjectTutor(tutorId);
                    this.tutorData = { ...data, password: "" };
                } else {
                    this.myProject = {};
                    this.tutorData = {};
                }
            },
        },
        beforeMount() {
            this.getMyProject();
            // 在全局事件总线上绑定自定义事件(选择和重选课题时触发)
            this.$bus.$on("myProjectHasChanged", () => {
                this.getMyProject();
            });
        },
        beforeDestroy() {
            this.$bus.$off("myProjectHasChanged");
        },
        beforeRouteEnter(to, from, next) {
            let loginInformation = JSON.parse(
                localStorage.getItem("loginInformation")
            );
            if (loginInformation) {
                let { identity } = loginInformation;
                if (identity !== 1) {
                    MessageBox.alert(
                        "对不起，您当前要访问的是学生界面，您暂无权限！",
                        "提示",
                        {
                            type: "warning",
                            confirmButtonText: "确定",
                            center: true,
                        }
                    );
                } else {
                    next();
                }
            }
        },
    };
</script>

<style lang="scss" scoped>
    .my_project_wrap {
        margin-top: 20px;
    }
</style>