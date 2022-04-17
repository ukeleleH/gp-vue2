<template>
    <div class="main_wrap">
        <!-- 登录组件 -->
        <div class="login_wrap">
            <el-form
                ref="form"
                :model="form"
                label-width="80px"
                :rules="rules"
                status-icon
            >
                <el-form-item label="账号：" style="font-weight: 800" prop="id">
                    <el-input
                        v-model="form.account"
                        placeholder="学号 / 工号 / 邮箱地址"
                        autocomplete="on"
                    />
                </el-form-item>
                <el-form-item
                    label="密码："
                    style="font-weight: 800"
                    prop="password"
                >
                    <el-input
                        v-model="form.password"
                        type="password"
                        placeholder="请输入密码"
                        show-password
                    />
                </el-form-item>
                <el-form-item style="font-weight: 800" prop="identity">
                    <el-radio v-model="identity" :label="1">学生</el-radio>
                    <el-radio v-model="identity" :label="2">导师</el-radio>
                    <el-radio v-model="identity" :label="3">管理员</el-radio>
                </el-form-item>
                <el-form-item style="display: flex; justify-content: center">
                    <el-button
                        type="primary"
                        style="
                            width: 150px;
                            height: 30px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        "
                        @click="login('form')"
                        >登录</el-button
                    >
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { studentLogin, tutorLogin, adminLogin } from "@/api/api";
    export default {
        name: "MyMain",
        data() {
            return {
                form: {
                    account: "",
                    password: "",
                },
                // 单选框选择的身份
                identity: "",
                // 验证规则
                rules: {
                    account: [
                        {
                            required: true,
                            message: "用户名不能为空",
                            trigger: "blur",
                        },
                    ],
                    password: [
                        {
                            required: true,
                            message: "密码不能为空",
                            trigger: "blur",
                        },
                    ],
                },
            };
        },
        methods: {
            login(formName) {
                const identity = this.identity;
                // 表单校验
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 校验成功
                        // 则判断登录的身份
                        if (identity === 1) {
                            //学生登录
                            studentLogin(this.form).then((data) => {
                                this.judgeLogin(data);
                            });
                        } else if (identity === 2) {
                            // 导师登录
                            tutorLogin(this.form).then((data) => {
                                this.judgeLogin(data);
                            });
                        } else if (identity === 3) {
                            // 管理员登录
                            adminLogin(this.form).then((data) => {
                                this.judgeLogin(data);
                            });
                        }
                    } else {
                        // 校验失败
                        return false;
                    }
                });
            },

            // 判断登录 （请求响应成功 resolved 之后执行的逻辑）
            judgeLogin(data) {
                // 如果返回空数据,则登录失败
                if (data === "") {
                    this.$message({
                        message: "登录失败，账号或密码错误",
                        type: "error",
                        center: true,
                    });
                    this.form.password = "";
                    return;
                }
                // 否则调用登录成功之后的逻辑
                this.loginSuccess(data, this.identity);
            },

            // 登录成功之后的逻辑
            loginSuccess(data, identity) {
                // 将登录的标志和查询到的学生对象发送给父组件 App
                this.$emit("login", {
                    ...data,
                    isLogin: true,
                    identity,
                    password: "",
                });
            },
        },
    };
</script>

<style lang="scss">
    .main_wrap {
        background-image: url("~@/assets/背景.png");
        background-repeat: no-repeat;
        background-position: center;
        width: 1100px;
        height: 500px;
        position: relative;
        .login_wrap {
            width: 360px;
            height: 500px;
            padding: 20px;
            padding-top: 60px;
            background: linear-gradient(
                rgba(255, 255, 255, 0.9) 40%,
                rgba(255, 255, 255, 0.5) 80%
            );
            position: absolute;
            right: 0;
            box-sizing: border-box;
        }
        .main_content {
            background: rgba(255, 255, 255, 0.3);
            height: 500px;
        }
    }
</style>