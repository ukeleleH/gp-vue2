<template>
    <div class="my_project_wrap">
        <!-- 我的课题信息 -->
        <el-descriptions title="我的课题" :column="3" border>
            <el-descriptions-item label="课题ID">
                {{ myProject.id }}
            </el-descriptions-item>
            <el-descriptions-item label="名称">
                {{ myProject.name }}
            </el-descriptions-item>
            <el-descriptions-item label="内容">
                {{ myProject.content }}
            </el-descriptions-item>
            <el-descriptions-item label="所属导师">
                {{ myProject.tutorId }}
            </el-descriptions-item>
            <el-descriptions-item label="性质">
                {{ myProject.nature }}
            </el-descriptions-item>
            <el-descriptions-item label="来源">
                {{ myProject.source }}
            </el-descriptions-item>
            <el-descriptions-item label="要求">
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
            <el-descriptions-item label="姓名">
                {{ tutorData.name }}
            </el-descriptions-item>
            <el-descriptions-item label="性别">
                {{ tutorData.gender }}
            </el-descriptions-item>
            <el-descriptions-item label="职称">
                {{ tutorData.title }}
            </el-descriptions-item>
            <el-descriptions-item label="学位">
                {{ tutorData.degree }}
            </el-descriptions-item>
            <el-descriptions-item label="电话">
                {{ tutorData.tel }}
            </el-descriptions-item>
            <el-descriptions-item label="QQ">
                {{ tutorData.qq }}
            </el-descriptions-item>
            <el-descriptions-item
                label="校内/校外"
                v-if="tutorData.isInsideSchool"
            >
                {{ tutorData.isInsideSchool ? "本校导师" : "校外聘请" }}
            </el-descriptions-item>
            <el-descriptions-item label="介绍">
                {{ tutorData.introduction }}
            </el-descriptions-item>
        </el-descriptions>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "MyProject",
        data() {
            return {
                // 我的课题信息
                myProject: {},
                // 导师信息
                tutorData: {},
            };
        },
        methods: {
            getMyProject() {
                const loginInformation = localStorage.getItem("loginInformation");
                const { id } = JSON.parse(loginInformation);
                // 发送请求, 获取我的课题信息
                axios.get(`/api/gp/student/myProject?id=${id}`).then((res) => {
                    if (res.data) {
                        this.myProject = res.data;
                        const { tutorId } = res.data;
                        // 发送请求, 获取我的导师信息
                        axios
                            .get(
                                `/api/gp/student/myProjectTutor?tutorId=${tutorId}`
                            )
                            .then((res) => {
                                this.tutorData = { ...res.data, password: "" };
                            });
                    }
                });
            },
        },
        beforeMount() {
            this.getMyProject();
            // 在全局事件总线上绑定自定义事件
            this.$bus.$on("hasChoosenProject", () => {
                this.getMyProject();
            });
        },
        beforeDestroy() {
            this.$bus.$off("hasChoosenProject");
        },
    };
</script>

<style lang="scss" scoped>
    .my_project_wrap {
        margin-top: 20px;
    }
</style>