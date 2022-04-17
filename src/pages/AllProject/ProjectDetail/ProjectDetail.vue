<template>
    <div class="my_project_wrap">
        <!-- 课题信息 -->
        <el-descriptions :column="3" border>
            <el-descriptions-item
                label="课题ID"
                :labelStyle="descLabelStyle"
                :contentStyle="descContentStyle"
            >
                {{ projectData.id }}
            </el-descriptions-item>
            <el-descriptions-item
                label="名称"
                :labelStyle="descLabelStyle"
                :contentStyle="descContentStyle"
            >
                {{ projectData.name }}
            </el-descriptions-item>
            <el-descriptions-item
                label="内容"
                :labelStyle="descLabelStyle"
                :contentStyle="descContentStyle"
            >
                {{ projectData.content }}
            </el-descriptions-item>
            <el-descriptions-item
                label="所属导师"
                :labelStyle="descLabelStyle"
                :contentStyle="descContentStyle"
            >
                {{ projectData.tutorId }}
            </el-descriptions-item>
            <el-descriptions-item
                label="性质"
                :labelStyle="descLabelStyle"
                :contentStyle="descContentStyle"
            >
                {{ projectData.nature }}
            </el-descriptions-item>
            <el-descriptions-item
                label="来源"
                :labelStyle="descLabelStyle"
                :contentStyle="descContentStyle"
            >
                {{ projectData.source }}
            </el-descriptions-item>
            <el-descriptions-item
                label="被选学生"
                :labelStyle="descLabelStyle"
                :contentStyle="descContentStyle"
            >
                <span v-if="projectData.studentId != '0'" style="color: green">
                    {{ projectData.studentId }}
                </span>
                <span v-else style="color: red">未被选</span>
            </el-descriptions-item>
            <el-descriptions-item
                label="要求"
                :labelStyle="descLabelStyle"
                :contentStyle="descContentStyle"
            >
                {{ projectData.demand }}
            </el-descriptions-item>
        </el-descriptions>
        <!-- 导师信息 -->
        <el-descriptions
            title="导师信息"
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
                <template v-if="tutorData.isInsideSchool != null">
                    <span v-if="tutorData.isInsideSchool" style="color: green">
                        本校导师
                    </span>
                    <span v-else style="color: red"> 校外聘请 </span>
                </template>
            </el-descriptions-item>
            <el-descriptions-item
                label="介绍"
                :labelStyle="descLabelStyle"
                :contentStyle="descContentStyle"
            >
                {{ tutorData.introduction }}
            </el-descriptions-item>
        </el-descriptions>
        <!-- 所选学生信息 -->
        <el-descriptions
            v-show="projectData.studentId != '0'"
            title="学生信息"
            :column="3"
            border
            style="margin-top: 50px"
        >
            <el-descriptions-item
                label="姓名"
                :labelStyle="descLabelStyle"
                :contentStyle="descContentStyle"
            >
                {{ studentData.name }}
            </el-descriptions-item>
            <el-descriptions-item
                label="性别"
                :labelStyle="descLabelStyle"
                :contentStyle="descContentStyle"
            >
                {{ studentData.gender }}
            </el-descriptions-item>
            <el-descriptions-item
                label="手机号"
                :labelStyle="descLabelStyle"
                :contentStyle="descContentStyle"
            >
                {{ studentData.tel }}
            </el-descriptions-item>
            <el-descriptions-item
                label="专业"
                :labelStyle="descLabelStyle"
                :contentStyle="descContentStyle"
            >
                {{ studentData.major }}
            </el-descriptions-item>
            <el-descriptions-item
                label="班级"
                :labelStyle="descLabelStyle"
                :contentStyle="descContentStyle"
            >
                {{ studentData.class_grade }}
            </el-descriptions-item>
        </el-descriptions>
    </div>
</template>

<script>
    import { getMyProjectTutor, getStudentData } from "@/api/api";
    export default {
        name: "ProjectDetail",
        data() {
            return {
                // 课题信息
                projectData: {},
                // 导师信息
                tutorData: {},
                // 学生信息
                studentData: {},
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
            async getTutorData() {
                // 发送请求, 获取导师信息
                let data = await getMyProjectTutor(this.projectData.tutorId);
                this.tutorData = { ...data, password: "" };
            },
            async getStudentData() {
                // 发送请求, 获取学生信息
                let data = await getStudentData(this.projectData.studentId);
                this.studentData = { ...data, password: "" };
            },
        },
        beforeMount() {
            this.projectData = this.$route.params;
            this.tutorData.name = this.$route.params.tutor;
            this.getTutorData();
            this.getStudentData();
        },
    };
</script>

<style lang="scss" scoped>
    .my_project_wrap {
        margin-top: 20px;
    }
</style>