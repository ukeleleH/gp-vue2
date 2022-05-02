<template>
    <div class="description_wrap">
        <!-- 学生登录时显示的部分 -->
        <el-form
            v-if="studentForm.major"
            ref="studentForm"
            :model="studentForm"
            :rules="studentFormRules"
        >
            <el-descriptions direction="vertical" :column="3" border>
                <el-descriptions-item label="账号（学号/工号/邮箱）">
                    <el-form-item>
                        <el-input
                            :readonly="true"
                            v-model="studentForm.sno"
                            @dblclick.native="showMessage"
                        ></el-input>
                    </el-form-item>
                </el-descriptions-item>
                <el-descriptions-item label="姓名">
                    <el-form-item prop="name">
                        <el-input
                            :readonly="isReadOnly"
                            :maxlength="32"
                            show-word-limit
                            v-model="studentForm.name"
                            ref="nameInput"
                        ></el-input>
                    </el-form-item>
                </el-descriptions-item>
                <el-descriptions-item label="性别">
                    <el-form-item prop="gender">
                        <el-select
                            style="width: 100%"
                            v-model="studentForm.gender"
                        >
                            <el-option
                                label="男"
                                value="男"
                                :disabled="isReadOnly"
                            ></el-option>
                            <el-option
                                label="女"
                                value="女"
                                :disabled="isReadOnly"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-descriptions-item>
                <el-descriptions-item label="手机号">
                    <el-form-item prop="tel">
                        <el-input
                            :readonly="isReadOnly"
                            :maxlength="11"
                            show-word-limit
                            v-model="studentForm.tel"
                        ></el-input>
                    </el-form-item>
                </el-descriptions-item>
                <el-descriptions-item label="专业">
                    <el-form-item prop="major">
                        <el-cascader
                            style="width: 100%"
                            :options="majorOptions"
                            :show-all-levels="false"
                            :props="{ expandTrigger: 'hover' }"
                            v-model="majorCascaderVal"
                            @change="majorChangeHandler"
                        ></el-cascader>
                    </el-form-item>
                </el-descriptions-item>
                <el-descriptions-item label="班级">
                    <el-form-item prop="class_grade">
                        <el-select
                            style="width: 100%"
                            v-model="studentForm.class_grade"
                        >
                            <el-option
                                v-for="item in classArr"
                                :key="item.id"
                                :disabled="isReadOnly"
                                :value="item.name"
                                :label="item.name"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-descriptions-item>
                <el-descriptions-item
                    label="所选毕业设计课题"
                    :span="2"
                    :labelStyle="{ background: '#E1F3D8' }"
                    :contentStyle="{ background: '#E1F3D8' }"
                >
                    <el-row>
                        <el-col :span="16">
                            <el-input
                                :readonly="true"
                                v-model="studentForm.sProject"
                                @dblclick.native="switchToMyProject"
                            >
                            </el-input>
                        </el-col>
                        <el-col :span="4">
                            <el-button
                                type="warning"
                                v-if="studentForm.sProject"
                                @click="HandleReselection"
                                style="margin-left: 15px"
                            >
                                重选
                            </el-button>
                        </el-col>
                    </el-row>
                </el-descriptions-item>
            </el-descriptions>
            <el-form-item class="changeBox" v-show="isReadOnly">
                <el-button size="small" type="primary" @click="changeProfile">
                    修改基本资料
                </el-button>
                <el-button size="small" type="primary" @click="changePassword">
                    修改密码
                </el-button>
            </el-form-item>
            <el-form-item class="changeBox" v-show="!isReadOnly">
                <el-button
                    size="small"
                    type="success"
                    @click="confirmChangeProfile(refName)"
                >
                    确定
                </el-button>
                <el-button
                    size="small"
                    type="danger"
                    @click="cancelChangeProfile(refName)"
                >
                    取消
                </el-button>
            </el-form-item>
        </el-form>

        <!-- 导师登录时显示的部分 -->
        <el-form
            v-if="tutorForm.title"
            ref="tutorForm"
            :model="tutorForm"
            :rules="tutorFormRules"
        >
            <el-descriptions direction="vertical" :column="4" border>
                <el-descriptions-item label="账号（学号/工号/邮箱）">
                    <el-form-item>
                        <el-input
                            :readonly="true"
                            v-model="tutorForm.tno"
                            @dblclick.native="showMessage"
                        ></el-input>
                    </el-form-item>
                </el-descriptions-item>
                <el-descriptions-item label="姓名">
                    <el-form-item prop="name">
                        <el-input
                            :readonly="isReadOnly"
                            v-model="tutorForm.name"
                            :maxlength="32"
                            show-word-limit
                            ref="nameInput"
                        ></el-input>
                    </el-form-item>
                </el-descriptions-item>
                <el-descriptions-item label="性别">
                    <el-form-item>
                        <el-select
                            style="width: 100%"
                            v-model="tutorForm.gender"
                        >
                            <el-option
                                label="男"
                                value="男"
                                :disabled="isReadOnly"
                            ></el-option>
                            <el-option
                                label="女"
                                value="女"
                                :disabled="isReadOnly"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-descriptions-item>
                <el-descriptions-item label="手机号">
                    <el-form-item prop="tel">
                        <el-input
                            :readonly="isReadOnly"
                            :maxlength="11"
                            show-word-limit
                            v-model="tutorForm.tel"
                        ></el-input>
                    </el-form-item>
                </el-descriptions-item>
                <el-descriptions-item label="QQ">
                    <el-form-item prop="qq">
                        <el-input
                            :readonly="isReadOnly"
                            :maxlength="12"
                            show-word-limit
                            v-model="tutorForm.qq"
                        ></el-input>
                    </el-form-item>
                </el-descriptions-item>
                <el-descriptions-item label="职称">
                    <el-form-item>
                        <el-input
                            :readonly="true"
                            v-model="tutorForm.title"
                            @dblclick.native="showMessage"
                        ></el-input>
                    </el-form-item>
                </el-descriptions-item>
                <el-descriptions-item label="学位">
                    <el-form-item>
                        <el-input
                            :readonly="true"
                            v-model="tutorForm.degree"
                            @dblclick.native="showMessage"
                        ></el-input>
                    </el-form-item>
                </el-descriptions-item>
                <el-descriptions-item label="校内/校外">
                    <el-form-item>
                        <el-input
                            :readonly="true"
                            @dblclick.native="showMessage"
                            :value="
                                tutorForm.isInsideSchool == 1
                                    ? '校内导师'
                                    : '校外专家'
                            "
                        >
                        </el-input>
                    </el-form-item>
                </el-descriptions-item>
                <el-descriptions-item
                    label="介绍"
                    :span="3"
                    :contentStyle="{
                        'border-bottom': '1px solid transparent',
                    }"
                >
                    <el-form-item prop="introduction">
                        <el-input
                            :readonly="isReadOnly"
                            type="textarea"
                            resize="none"
                            :rows="4"
                            :maxlength="255"
                            show-word-limit
                            v-model="tutorForm.introduction"
                        ></el-input>
                    </el-form-item>
                </el-descriptions-item>
            </el-descriptions>
            <el-form-item class="changeBox" v-show="isReadOnly">
                <el-button size="small" type="primary" @click="changeProfile">
                    修改基本资料
                </el-button>
                <el-button size="small" type="primary" @click="changePassword">
                    修改密码
                </el-button>
            </el-form-item>
            <el-form-item class="changeBox" v-show="!isReadOnly">
                <el-button
                    size="small"
                    type="success"
                    @click="confirmChangeProfile(refName)"
                >
                    确定
                </el-button>
                <el-button
                    size="small"
                    type="danger"
                    @click="cancelChangeProfile(refName)"
                >
                    取消
                </el-button>
            </el-form-item>
        </el-form>

        <!-- 修改密码的对话框 -->
        <el-dialog
            class="dialogForm"
            :visible.sync="dialogFormVisible"
            :close-on-click-modal="false"
            width="28%"
            center
        >
            <div slot="title" class="title">密码修改</div>
            <el-form ref="pwdForm" :model="pwdForm" :rules="pwdRules">
                <el-form-item label="新密码" prop="password">
                    <el-input
                        v-model="pwdForm.password"
                        type="password"
                        :maxlength="20"
                    ></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="checkPass">
                    <el-input
                        v-model="pwdForm.checkPass"
                        type="password"
                        :maxlength="20"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="footer">
                <el-button
                    type="success"
                    size="small"
                    @click="confirmChangePassword('pwdForm')"
                >
                    确 定
                </el-button>
                <el-button
                    type="danger"
                    size="small"
                    @click="cancelChangePassword('pwdForm')"
                >
                    取 消
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        getStudentProject,
        getStudentOpportunity,
        updateStudentOpportunity,
        studentUpdateHasChooseProject,
        studentChangeProfile,
        tutorChangeProfile,
        studentChangePassword,
        tutorChangePassword,
    } from "@/api/api";
    import searchMajorMixin from "@/mixin/searchMajor.mixin";
    export default {
        name: "Profile",
        mixins: [searchMajorMixin],
        data() {
            // 密码校验规则
            let validatePass = (rule, value, callback) => {
                let reg = /^\w{8,20}$/;
                if (value === "") {
                    callback(new Error("请输入新密码"));
                } else if (!reg.test(value)) {
                    callback(
                        new Error("密码只能包含字母、数字、下划线，且长度至少8位")
                    );
                } else {
                    this.$refs.pwdForm.validateField("checkPass");
                    callback();
                }
            };
            // 确认密码校验规则
            let validateCheckPass = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请再一次输入新密码"));
                } else if (value !== this.pwdForm.password) {
                    callback(new Error("两次输入密码不一致!"));
                } else {
                    callback();
                }
            };
            // 手机号校验规则
            let checkTel = (rule, value, callback) => {
                // 在输入框不是只读的时候才进行校验规则的判断
                if (!this.isReadOnly) {
                    let reg = /^(13\d|14[579]|15[^4\D]|17[^49\D]|18\d)\d{8}$/;
                    if (value === "") {
                        callback(new Error("手机号不能为空"));
                    } else if (value.length !== 11) {
                        callback(new Error("格式不正确，请输入11位手机号"));
                    } else if (!reg.test(value)) {
                        callback(new Error("格式不正确，手机号以13/4/5/7/8开头"));
                    } else {
                        callback();
                    }
                }
            };
            // QQ号的校验规则
            let checkQQ = (rule, value, callback) => {
                if (!this.isReadOnly) {
                    let reg = /^\d{6,12}$/;
                    if (!reg.test(value)) {
                        callback(new Error("QQ号只能是数字,且为6-12位"));
                    } else {
                        callback();
                    }
                }
            };
            // 导师介绍的校验规则
            let checkIntro = (rule, value, callback) => {
                if (!this.isReadOnly) {
                    if (value.trim() === "") {
                        callback(new Error("个人介绍不能为空"));
                    } else if (value.length < 10) {
                        callback(new Error("请至少输入10个字"));
                    } else {
                        callback();
                    }
                }
            };
            return {
                isReadOnly: true,
                studentForm: {},
                tutorForm: {},
                rawFormData: {},
                majorCascaderVal: [], // 级联框选中的值
                rawMajorCascaderVal: [], // 原始级联框选中的值
                majorOptions: [], // 级联选择框的数据
                classArr: [], // 班级下拉框数据
                refName: "",

                studentFormRules: {
                    name: [
                        {
                            required: true,
                            message: "姓名不能为空",
                            trigger: "blur",
                        },
                    ],
                    major: [{ required: true, trigger: "blur" }],
                    class_grade: [{ required: true, trigger: "blur" }],
                    tel: [{ validator: checkTel, trigger: "blur" }],
                },

                tutorFormRules: {
                    name: [
                        {
                            required: true,
                            message: "姓名不能为空",
                            trigger: "blur",
                        },
                    ],
                    qq: [{ validator: checkQQ, trigger: "blur" }],
                    introduction: [{ validator: checkIntro, trigger: "blur" }],
                    tel: [{ validator: checkTel, trigger: "blur" }],
                },

                dialogFormVisible: false,
                pwdForm: {
                    password: "",
                    checkPass: "",
                },
                pwdRules: {
                    password: [{ validator: validatePass, trigger: "blur" }],
                    checkPass: [{ validator: validateCheckPass, trigger: "blur" }],
                },
            };
        },
        watch: {
            isReadOnly(newVal, oldVal) {
                if (newVal == true) {
                    this.majorOptions.forEach((item) => {
                        item.children.forEach((innerItem) => {
                            innerItem.disabled = true;
                        });
                    });
                }
                if (newVal == false) {
                    this.majorOptions.forEach((item) => {
                        item.children.forEach((innerItem) => {
                            innerItem.disabled = false;
                        });
                    });
                }
            },
        },
        methods: {
            // 点击修改基本资料
            changeProfile() {
                this.isReadOnly = false;
                // 获取焦点
                this.$refs.nameInput.focus();
            },

            // 确定修改基本资料
            confirmChangeProfile(formRefName) {
                // 表单校验
                this.$refs[formRefName].validate(async (valid) => {
                    if (valid) {
                        // 校验通过
                        // 如果是学生
                        if (this.studentForm.major) {
                            const { name, gender, tel, major, class_grade } =
                                this.rawFormData;
                            // 如果信息未做修改，直接返回，不发送请求
                            if (
                                name === this.studentForm.name &&
                                gender === this.studentForm.gender &&
                                tel === this.studentForm.tel &&
                                major === this.studentForm.major &&
                                class_grade === this.studentForm.class_grade
                            ) {
                                this.$message({
                                    type: "info",
                                    center: true,
                                    message: "信息未修改",
                                });
                                return;
                            }
                            // 信息有修改，发送请求
                            let data = await studentChangeProfile(this.studentForm);
                            this.judgeChangeProfile(data);
                        }
                        // 如果是导师
                        if (this.tutorForm.title) {
                            const { name, gender, tel, qq, introduction } =
                                this.rawFormData;
                            // 如果信息未做修改，直接返回，不发送请求
                            if (
                                name === this.tutorForm.name &&
                                gender === this.tutorForm.gender &&
                                tel === this.tutorForm.tel &&
                                qq === this.tutorForm.qq &&
                                introduction === this.tutorForm.introduction
                            ) {
                                this.$message({
                                    type: "info",
                                    center: true,
                                    message: "信息未修改",
                                });
                                return;
                            }
                            // 信息有修改，发送请求
                            let data = await tutorChangeProfile(this.tutorForm);
                            this.judgeChangeProfile(data);
                        }
                    } else {
                        // 校验失败
                        return false;
                    }
                });
            },

            //  判断修改个人信息的响应结果
            judgeChangeProfile(resData) {
                if (resData) {
                    this.$message({
                        type: "success",
                        center: true,
                        message: "修改成功",
                    });
                    // 重新只读
                    this.isReadOnly = true;
                    // 更新 rawFormData
                    this.rawFormData = this.studentForm.major
                        ? { ...this.studentForm }
                        : { ...this.tutorForm };
                    // 更新 rawMajorCascaderVal
                    this.rawMajorCascaderVal = this.majorCascaderVal;
                    // 修改本地存储的登录信息
                    let loginInfo = JSON.parse(
                        localStorage.getItem("loginInformation")
                    );
                    let newLoginInfo = JSON.stringify({
                        ...loginInfo,
                        ...this.rawFormData,
                    });
                    localStorage.setItem("loginInformation", newLoginInfo);
                    // 触发全局事件总线中绑定的事件
                    this.$bus.$emit("profileHasChanged");
                } else {
                    this.$message({
                        type: "error",
                        center: true,
                        message: "修改失败",
                    });
                }
            },

            // 取消修改基本资料
            cancelChangeProfile(formRefName) {
                this.$refs[formRefName].resetFields();
                if (formRefName === "studentForm") {
                    this.studentForm = { ...this.rawFormData };
                    this.majorCascaderVal = this.rawMajorCascaderVal;
                }
                if (formRefName === "tutorForm") {
                    this.tutorForm = { ...this.rawFormData };
                }
                this.isReadOnly = true;
            },

            // 弹出不可更改的信息
            showMessage() {
                if (this.isReadOnly === false) {
                    this.$message({
                        type: "info",
                        center: true,
                        message: "此项不可修改，请联系管理员进行修改",
                    });
                }
            },

            // 点击修改密码
            changePassword() {
                this.dialogFormVisible = true;
            },

            // 确认修改密码
            confirmChangePassword(formRefName) {
                this.$refs[formRefName].validate(async (valid) => {
                    if (valid) {
                        if (this.studentForm.major) {
                            // 如果有 major 信息, 就是学生身份
                            const { sno } = this.studentForm;
                            const { password } = this.pwdForm;
                            let data = await studentChangePassword(sno, password);
                            this.judgeChangePassword(data);
                        } else if (this.tutorForm.title) {
                            // 如果有 title 信息就是导师身份
                            const { tno } = this.tutorForm;
                            const { password } = this.pwdForm;
                            let data = await tutorChangePassword(tno, password);
                            this.judgeChangePassword(data);
                        }
                    } else {
                        return false;
                    }
                });
            },

            // 判断修改密码的响应结果
            judgeChangePassword(resData) {
                if (resData) {
                    this.dialogFormVisible = false;
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
                    }, 5000);
                    setTimeout(() => {
                        this.$bus.$emit("passwordHasChanged");
                    }, 10000);
                } else {
                    this.dialogFormVisible = false;
                    this.$message({
                        message: "密码修改失败",
                        type: "error",
                        center: true,
                    });
                }
            },

            // 取消修改密码
            cancelChangePassword(formRefName) {
                this.$refs[formRefName].resetFields();
                this.dialogFormVisible = false;
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
                        const { sno } = this.studentForm;
                        // 查询可重选的次数
                        let num = await getStudentOpportunity(sno);
                        if (num) {
                            // 更新已选择的课题信息
                            const data = await studentUpdateHasChooseProject(sno);
                            // 更新可重选的次数
                            const dataTwo =
                                data && (await updateStudentOpportunity(sno));
                            if (dataTwo) {
                                this.studentForm.sProject = "";
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
                                message: "您的重选次数已用完!",
                            });
                        }
                    })
                    .catch(() => {});
            },
        },

        async beforeMount() {
            const { query } = this.$route;
            // 判断身份
            // 如果路由传递过来的参数包含有 title , 则就是导师身份
            if (query.title) {
                this.refName = "tutorForm";
                this.tutorForm = { ...query };
                // 原始数据
                this.rawFormData = { ...query };
            }
            // 如果路由传递过来的参数包含有 major , 则就是学生身份
            if (query.major) {
                this.refName = "studentForm";
                // 查询学生选择的毕业设计题目
                let data = await getStudentProject(query.sno);
                this.studentForm = { ...query, sProject: data };
                // 存入原始数据
                this.rawFormData = { ...this.studentForm };
                // 调用 mixin 里的方法，查询学科部与专业
                this.getDepartment();
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
                    let { tno, name, qq, title, gender } = to.query;
                    let { degree, tel, isInsideSchool, introduction } = to.query;
                    // 如果任何一个参数为空，则不进行跳转
                    if (
                        !tno ||
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
                        tno != loginInformation.tno ||
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
                    let { sno, name, major, class_grade, gender, tel } = to.query;
                    // 如果任何一个参数为空，则不进行跳转
                    if (
                        !sno ||
                        !name ||
                        !major ||
                        !class_grade ||
                        !gender ||
                        !tel
                    ) {
                        next(false);
                    } else if (
                        // 如果任何一个参数和登录信息里的不相等，则不进行跳转
                        // 这里不使用全等判断类型， 因为 query 对象里的 value 都是字符串类型
                        sno != loginInformation.sno ||
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

<style lang="scss" scoped>
    .description_wrap {
        margin-top: 20px;
        user-select: none;
    }
    .changeBox {
        border: 1px solid #ebeef5;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        button {
            &:first-child {
                margin-left: -25px;
                margin-right: 40px;
            }
        }
    }
    .dialogForm {
        .title {
            border-bottom: 1px solid #ebeef5;
            padding-bottom: 20px;
            font-size: 20px;
        }
        .footer {
            width: 170px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
        }
    }
</style>