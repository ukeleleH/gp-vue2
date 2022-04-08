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
                    <el-row>
                        <el-col :span="18">
                            <el-input
                                :readonly="true"
                                v-model="personInfo.sProject"
                                @dblclick.native="switchToMyProject"
                            >
                            </el-input>
                        </el-col>
                        <el-col :span="4" :offset="2">
                            <el-button
                                type="warning"
                                v-if="personInfo.sProject"
                                @click="HandleReselection"
                            >
                                重选
                            </el-button>
                        </el-col>
                    </el-row>
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
        getStudentOpportunity,
        updateStudentOpportunity,
        studentUpdateHasChooseProject,
        studentChangePassword,
        tutorChangePassword,
    } from "@/api/api";
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
            async handleSubmit() {
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
                    let data = await studentChangePassword(id, password);
                    this.changePassword(data);
                } else if (this.personInfo.title) {
                    // 如果有 title 信息就是导师身份
                    let data = await tutorChangePassword(id, password);
                    this.changePassword(data);
                }
            },

            // 双击课题名称时路由跳转
            switchToMyProject() {
                this.$router.push("/my_project");
            },

            // 重选课题
            HandleReselection() {
                this.$confirm(
                    "每个人只有一次重选机会，且重选后可能不能再选择到现在的选题，确定要重选吗?",
                    "提示",
                    {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                    }
                )
                    .then(async () => {
                        const { id } = this.personInfo;
                        // 查询可重选的次数
                        let num = await getStudentOpportunity(id);
                        if (num) {
                            // 更新已选择的课题信息
                            const data = await studentUpdateHasChooseProject(id);
                            // 更新可重选的次数
                            const dataTwo =
                                data && (await updateStudentOpportunity(id));
                            if (dataTwo) {
                                this.personInfo.sProject = "";
                                this.$message({
                                    type: "success",
                                    center: true,
                                    message: "请重新选择毕业选题!",
                                });
                                // 触发全局事件总线里的自定义事件, 更新全部的课题信息，更新我的课题信息
                                this.$bus.$emit("projectHasChanged");
                                this.$bus.$emit("myProjectHasChanged");
                            }
                        } else {
                            this.$message({
                                type: "error",
                                center: true,
                                message: "重选失败，您已没有重选机会!",
                            });
                        }
                    })
                    .catch(() => {});
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
        async beforeMount() {
            // 解构赋值然后重命名
            const { query: personInfo } = this.$route;
            this.personInfo = personInfo;

            // 判断身份
            // 如果路由传递过来的参数包含有 major , 则就是学生身份
            if (personInfo.major) {
                // 查询学生选择的毕业设计题目
                let data = await getStudentProject(personInfo.id);
                this.personInfo = { ...this.personInfo, sProject: data };
            }
        },

        // 组件内前置导航守卫， 保证参数必传
        beforeRouteEnter(to, _, next) {
            let loginInformation = JSON.parse(
                localStorage.getItem("loginInformation")
            );
            if (loginInformation) {
                let { identity } = loginInformation;
                if (identity === 3) {
                    // 如果为管理员身份
                    next(false);
                } else if (identity === 2) {
                    // 如果为导师身份
                    let { id, name, qq, title, gender } = to.query;
                    let { degree, tel, isInsideSchool, introduction } = to.query;
                    // 如果任何一个参数为空，则不进行跳转
                    if (
                        !id ||
                        !name ||
                        !qq ||
                        !title ||
                        !gender ||
                        !degree ||
                        !tel ||
                        !isInsideSchool ||
                        !introduction
                    ) {
                        next(false);
                    } else if (
                        // 如果任何一个参数和登录信息里的不相等，则不进行跳转
                        // 这里不使用全等判断类型， 因为 query 对象里的 value 都是字符串类型
                        id != loginInformation.id ||
                        name != loginInformation.name ||
                        qq != loginInformation.qq ||
                        title != loginInformation.title ||
                        gender != loginInformation.gender ||
                        degree != loginInformation.degree ||
                        tel != loginInformation.tel ||
                        isInsideSchool != loginInformation.isInsideSchool ||
                        introduction != loginInformation.introduction
                    ) {
                        next(false);
                    } else {
                        next();
                    }
                } else if (identity === 1) {
                    // 如果为学生身份
                    let { id, name, major, class_grade, gender, tel } = to.query;
                    // 如果任何一个参数为空，则不进行跳转
                    if (!id || !name || !major || !class_grade || !gender || !tel) {
                        next(false);
                    } else if (
                        // 如果任何一个参数和登录信息里的不相等，则不进行跳转
                        // 这里不使用全等判断类型， 因为 query 对象里的 value 都是字符串类型
                        id != loginInformation.id ||
                        name != loginInformation.name ||
                        gender != loginInformation.gender ||
                        tel != loginInformation.tel ||
                        major != loginInformation.major ||
                        class_grade != loginInformation.class_grade
                    ) {
                        next(false);
                    } else {
                        next();
                    }
                }
            }
        },
    };
</script>

<style>
</style>