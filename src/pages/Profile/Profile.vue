<template>
    <div style="margin-top: 20px; user-select: none">
        <!-- 学生登录时显示的部分 -->
        <template v-if="personInfo.major">
            <el-descriptions direction="vertical" :column="4" border>
                <el-descriptions-item label="账号（学号/工号/邮箱）">
                    <el-input
                        :readonly="true"
                        v-model="personInfo.id"
                    ></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="姓名">
                    <el-input
                        :readonly="true"
                        v-model="personInfo.name"
                    ></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="性别">
                    <el-input
                        :readonly="true"
                        v-model="personInfo.gender"
                    ></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="手机号">
                    <el-input
                        :readonly="true"
                        v-model="personInfo.tel"
                    ></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="专业">
                    <el-input
                        :readonly="true"
                        v-model="personInfo.major"
                    ></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="班级">
                    <el-input
                        :readonly="true"
                        v-model="personInfo.class_grade"
                    ></el-input>
                </el-descriptions-item>
                <el-descriptions-item
                    label="所选毕业设计课题"
                    :span="2"
                    :labelStyle="{ background: '#E1F3D8' }"
                    :contentStyle="{ background: '#E1F3D8' }"
                >
                    <el-input
                        :readonly="true"
                        v-model="personInfo.sProject"
                        @dblclick.native="switchToMyProject"
                    ></el-input>
                </el-descriptions-item>
            </el-descriptions>
        </template>

        <!-- 导师登录时显示的部分 -->
        <template v-if="personInfo.title">
            <el-descriptions direction="vertical" :column="4" border>
                <el-descriptions-item label="账号（学号/工号/邮箱）">
                    <el-input
                        :readonly="true"
                        v-model="personInfo.id"
                    ></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="姓名">
                    <el-input
                        :readonly="true"
                        v-model="personInfo.name"
                    ></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="性别">
                    <el-input
                        :readonly="true"
                        v-model="personInfo.gender"
                    ></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="手机号">
                    <el-input
                        :readonly="true"
                        v-model="personInfo.tel"
                    ></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="QQ">
                    <el-input
                        :readonly="true"
                        v-model="personInfo.qq"
                    ></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="职称">
                    <el-input
                        :readonly="true"
                        v-model="personInfo.title"
                    ></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="学位">
                    <el-input
                        :readonly="true"
                        v-model="personInfo.degree"
                    ></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="校内/校外">
                    <el-input
                        :readonly="true"
                        :value="
                            personInfo.isInsideSchool == 1
                                ? '校内导师'
                                : '校外专家'
                        "
                    ></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="介绍" :span="4">
                    <el-input
                        :readonly="true"
                        v-model="personInfo.introduction"
                    ></el-input>
                </el-descriptions-item>
            </el-descriptions>
        </template>

        <!-- 修改密码的部分 -->
        <el-descriptions
            title="修改密码"
            :column="3"
            border
            style="margin-top: 50px"
        >
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-notebook-1"></i>
                    密码
                </template>
                <el-input
                    type="password"
                    :readonly="isReadOnly"
                    v-model="password"
                    show-password
                    style="width: 300px"
                >
                </el-input>
                <el-button
                    type="primary"
                    @click="handleChange"
                    plain
                    v-show="isReadOnly"
                    >修改</el-button
                >
                <el-button
                    type="success"
                    @click="handleSubmit"
                    plain
                    v-show="!isReadOnly"
                    >提交</el-button
                >
            </el-descriptions-item>
        </el-descriptions>
    </div>
</template>

<script>
    import {
        getStudentProject,
        studentChangePassword,
        tutorChangePassword,
    } from "../../api/api";
    export default {
        name: "Profile",
        data() {
            return {
                isReadOnly: true,
                personInfo: {},
                password: "**********",
            };
        },
        methods: {
            // 点击修改按钮
            handleChange() {
                this.isReadOnly = false;
                this.password = "";
            },
            // 点击提交按钮
            handleSubmit() {
                // 如果为空，直接返回
                if (this.password.trim() === "") {
                    this.$message({
                        message: "密码不能为空",
                        type: "error",
                        center: true,
                    });
                    return;
                }
                const { id } = this.personInfo;
                const password = this.password.trim();
                // 如果有 major 信息, 就是学生身份
                if (this.personInfo.major) {
                    studentChangePassword(id, password).then((data) => {
                        this.changePassword(data);
                    });
                } else if (this.personInfo.title) {
                    // 如果有 title 信息就是导师身份
                    tutorChangePassword(id, password).then((data) => {
                        this.changePassword(data);
                    });
                }
            },

            // 双击课题名称时路由跳转
            switchToMyProject() {
                this.$router.push("/my_project");
            },

            // 修改密码 (请求响应成功之后执行的逻辑)
            changePassword(data) {
                if (data) {
                    this.$message({
                        message: "密码修改成功",
                        type: "success",
                        center: true,
                    });
                    setTimeout(() => {
                        this.$message({
                            message: "系统即将退出，请重新登录",
                            type: "info",
                            center: true,
                        });
                    }, 4000);
                    setTimeout(() => {
                        this.$bus.$emit("passwordHasChanged");
                    }, 8000);
                } else {
                    this.$message({
                        message: "密码修改失败",
                        type: "error",
                        center: true,
                    });
                }
                // 重新只读
                this.isReadOnly = true;
            },
        },
        beforeMount() {
            // 解构赋值然后重命名
            const { query: personInfo } = this.$route;
            this.personInfo = personInfo;

            // 判断身份
            // 如果路由传递过来的参数包含有 major , 则就是学生身份
            if (personInfo.major) {
                // 查询学生选择的毕业设计题目
                getStudentProject(personInfo.id).then((data) => {
                    this.personInfo = {
                        ...this.personInfo,
                        sProject: data,
                    };
                });
            }
        },
    };
</script>

<style>
</style>