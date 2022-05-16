<template>
    <div>
        <!-- 通用表格 -->
        <common-tabel
            :height="studentTableHeight"
            :headers="studentTableHeaders"
            :dataList="allStudentList"
            :showDetail="changeStudent"
        >
            <el-table-column slot="password" label="密码" width="180px">
                <template slot-scope="scope">
                    <el-input
                        v-model="scope.row.password"
                        type="password"
                        disabled
                        style="width: 70%"
                    ></el-input>
                </template>
            </el-table-column>
            <el-table-column
                slot="operateArea"
                width="200px"
                fixed="right"
                align="right"
            >
                <template slot="header">
                    <el-button
                        type="success"
                        @click="addStudent"
                        icon="el-icon-plus"
                    >
                        添加学生信息
                    </el-button>
                </template>
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        icon="el-icon-edit"
                        size="mini"
                        @click.native.prevent="changeStudent(scope.row)"
                    >
                        修改
                    </el-button>
                    <el-button
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        @click.native.prevent="deleteStudent(scope.row)"
                    >
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </common-tabel>
        <!-- 通用描述列表 -->
        <common-desc
            v-show="isDescShow"
            refName="changeStudent"
            :labels="studentFormLabels"
            :descObj="currentRowObj"
            :changeRules="changeStudentRules"
            :pullUp="pullUp"
            :confirmChange="confirmChange"
            :cancelChange="cancelChange"
        >
            <el-select
                slot="gender"
                slot-scope="{ descObj }"
                v-model="descObj['gender']"
                placeholder="请选择"
                style="width: 100%"
            >
                <el-option label="男" value="男"> </el-option>
                <el-option label="女" value="女"> </el-option>
            </el-select>
            <el-cascader
                slot="major"
                slot-scope="{}"
                v-model="majorCascaderVal"
                style="width: 100%"
                :options="majorOptions"
                :show-all-levels="false"
                :props="{ expandTrigger: 'hover' }"
                @change="majorChangeHandler"
            >
            </el-cascader>
            <el-select
                slot="class_grade"
                slot-scope="{ descObj }"
                v-model="descObj['class_grade']"
                placeholder="请选择"
                style="width: 27%"
            >
                <el-option
                    v-for="item in classArr"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                >
                </el-option>
            </el-select>
        </common-desc>
        <!-- 通用表单 -->
        <common-form
            refName="newStudent"
            v-show="isFormShow"
            :labels="studentFormLabels"
            :addForm="studentForm"
            :addRules="addStudentRules"
            :pullUp="pullUp"
            :confirmAdd="confirmAdd"
            :cancelAdd="cancelAdd"
        >
            <el-form-item slot="gender" slot-scope="{ addForm }" prop="gender">
                <el-select
                    v-model="addForm['gender']"
                    placeholder="请选择"
                    style="width: 100%"
                >
                    <el-option label="男" value="男"> </el-option>
                    <el-option label="女" value="女"> </el-option>
                </el-select>
            </el-form-item>
            <el-form-item slot="major" slot-scope="{}" prop="major">
                <el-cascader
                    v-model="majorCascaderVal"
                    style="width: 100%"
                    :options="majorOptions"
                    :show-all-levels="false"
                    :props="{ expandTrigger: 'hover' }"
                    @change="majorChangeHandler"
                >
                </el-cascader>
            </el-form-item>
            <el-form-item
                slot="class_grade"
                slot-scope="{ addForm }"
                prop="class_grade"
            >
                <el-select
                    v-model="addForm['class_grade']"
                    placeholder="请选择"
                    style="width: 27%"
                >
                    <el-option
                        v-for="item in classArr"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
        </common-form>
    </div>
</template>

<script>
    // 引入组件
    import CommonTabel from "@/components/common/CommonTable.vue";
    import CommonDesc from "@/components/common/CommonDesc.vue";
    import CommonForm from "@/components/common/CommonForm.vue";
    // 引入 mixin
    import searchMajorMixin from "@/mixin/searchMajor.mixin";
    // 引入 api
    import {
        adminSelectAllStudent,
        adminIsUniqueStudentId,
        adminDeleteStudent,
        adminAddStudent,
        adminChangeStudent,
    } from "@/api/api";
    import { MessageBox } from "element-ui";
    export default {
        name: "StudentManage",
        mixins: [searchMajorMixin],
        components: { CommonTabel, CommonForm, CommonDesc },
        data() {
            // 修改学生时验证学号的规则
            let checkStudentId = (_, value, callback) => {
                let reg = /^\d{10}$/;
                if (value === "") {
                    callback(new Error("请输入学生学号"));
                } else if (!reg.test(value)) {
                    callback(new Error("学号只能是10位数字"));
                } else if (this.currentRowObj.sno != this.rawCurrentRowObj.sno) {
                    // 查询是否存在
                    adminIsUniqueStudentId(value.trim()).then((data) => {
                        if (data) {
                            callback(new Error("学号已存在"));
                        } else {
                            callback();
                        }
                    });
                } else {
                    callback();
                }
            };
            // 添加学生时验证学号的规则
            let checkStudentId2 = (_, value, callback) => {
                let reg = /^\d{10}$/;
                if (value === "") {
                    callback(new Error("请输入学生学号"));
                } else if (!reg.test(value)) {
                    callback(new Error("学号只能是10位数字"));
                } else {
                    // 查询是否存在
                    adminIsUniqueStudentId(value.trim()).then((data) => {
                        if (data) {
                            callback(new Error("学号已存在"));
                        } else {
                            callback();
                        }
                    });
                }
            };
            let validatePass = (rule, value, callback) => {
                let reg = /^\w{8,20}$/;
                if (value === "") {
                    callback(new Error("请配置学生初始密码"));
                } else if (!reg.test(value)) {
                    callback(
                        new Error("密码只能包含字母、数字、下划线，且长度至少8位")
                    );
                } else {
                    callback();
                }
            };
            let checkTel = (rule, value, callback) => {
                let reg = /^(13\d|14[579]|15[^4\D]|17[^49\D]|18\d)\d{8}$/;
                if (value === "") {
                    callback(new Error("请输入学生手机号"));
                } else if (value.length !== 11) {
                    callback(new Error("格式不正确，请输入11位手机号"));
                } else if (!reg.test(value)) {
                    callback(new Error("格式不正确，手机号以13/4/5/7/8开头"));
                } else {
                    callback();
                }
            };
            return {
                isDescShow: false,
                isFormShow: false,

                studentTableHeight: 650,
                studentTableHeaders: [],
                allStudentList: [],

                currentRowObj: {},
                rawCurrentRowObj: {},

                majorOptions: [], // 专业的级联数据
                majorCascaderVal: [], // 专业级联框的值
                rawMajorCascaderVal: [], // 初始专业级联框的值
                classArr: [], // 班级下拉框数据

                studentFormLabels: [
                    "sno",
                    "password",
                    "name",
                    "tel",
                    "gender",
                    "major",
                    "class_grade",
                ],
                studentForm: {
                    sno: "",
                    password: "",
                    name: "",
                    tel: "",
                    gender: "",
                    major: "",
                    class_grade: "",
                },

                // 修改学生时的表单规则
                changeStudentRules: {
                    sno: [{ validator: checkStudentId, trigger: "blur" }],
                    tel: [{ validator: checkTel, trigger: "blur" }],
                    name: [
                        {
                            required: true,
                            message: "请输入学生姓名",
                            trigger: "blur",
                        },
                    ],
                    class_grade: [
                        {
                            required: true,
                            message: "请选择学生班级",
                        },
                    ],
                },

                // 添加学生时的表单规则
                addStudentRules: {
                    sno: [{ validator: checkStudentId2, trigger: "blur" }],
                    password: [{ validator: validatePass, trigger: "blur" }],
                    tel: [{ validator: checkTel, trigger: "blur" }],
                    name: [
                        {
                            required: true,
                            message: "请输入学生姓名",
                            trigger: "blur",
                        },
                    ],
                    gender: [
                        {
                            required: true,
                            message: "请选择学生性别",
                        },
                    ],
                    major: [
                        {
                            required: true,
                            message: "请选择学生专业",
                            trigger: "blur",
                        },
                    ],
                    class_grade: [
                        {
                            required: true,
                            message: "请选择学生班级",
                        },
                    ],
                },
            };
        },
        methods: {
            // 查询所有学生
            async getAllStudent() {
                let data = await adminSelectAllStudent();
                if (data) {
                    let tempTableHeaders = [];
                    for (let v in data[0]) {
                        tempTableHeaders.push(v);
                    }
                    this.studentTableHeaders = tempTableHeaders;
                }
                this.allStudentList = data;
            },
            // 新增按钮
            addStudent() {
                this.studentTableHeight = 262;
                this.isFormShow = true;
                this.isDescShow = false;
                this.majorCascaderVal = []; // 清空 majorCascaderVal
                this.classArr = []; // 清空 classArr
                // 如果专业数组为空，则发送请求
                if (this.majorOptions.length === 0) {
                    this.getDepartment();
                }
            },
            // 修改学生信息
            changeStudent(row) {
                this.studentTableHeight = 262;
                this.isFormShow = false;
                this.isDescShow = true;
                this.currentRowObj = { ...row };
                this.rawCurrentRowObj = { ...row };
                // 触发 mixin 中的方法，获取专业数据
                this.getDepartment();
            },
            // 删除学生
            deleteStudent(row) {
                this.$confirm("确认删除该学生信息吗？", "删除学生", {
                    type: "warning",
                })
                    .then(() => {
                        adminDeleteStudent(row.id).then((data) => {
                            if (data) {
                                this.$notify({
                                    type: "success",
                                    message: "学生信息删除成功",
                                    title: "成功",
                                });
                                // 重新查询数据
                                this.getAllStudent();
                            }
                        });
                    })
                    .catch(() => {
                        this.$notify({
                            type: "info",
                            message: "学生信息已取消删除",
                            title: "取消",
                        });
                    });
            },
            // 确认新增学生信息
            confirmAdd(refName, refs) {
                refs[refName].validate(async (valid) => {
                    if (valid) {
                        // 如果校验通过，则发送请求
                        let data = await adminAddStudent(this.studentForm);
                        if (data) {
                            this.$message({
                                type: "success",
                                message: "学生信息添加成功",
                                center: true,
                            });
                            this.getAllStudent();
                        }
                    }
                });
            },
            // 取消新增学生信息,重置表单
            cancelAdd(refName, refs) {
                refs[refName].resetFields();
                this.majorCascaderVal = [];
            },
            // 确认修改学生信息
            confirmChange(refName, refs) {
                const { sno, password, name, tel, gender, major, class_grade } =
                    this.currentRowObj;
                if (
                    sno === this.rawCurrentRowObj.sno &&
                    password === this.rawCurrentRowObj.password &&
                    name === this.rawCurrentRowObj.name &&
                    tel === this.rawCurrentRowObj.tel &&
                    gender === this.rawCurrentRowObj.gender &&
                    major === this.rawCurrentRowObj.major &&
                    class_grade === this.rawCurrentRowObj.class_grade
                ) {
                    this.$message({
                        message: "学生信息未作修改",
                        type: "info",
                        center: true,
                    });
                    return;
                }
                // 表单校验
                refs[refName].validate(async (valid) => {
                    if (valid) {
                        // 发送请求，修改学生信息
                        let data = await adminChangeStudent(this.currentRowObj);
                        // 当学号有修改时，也要更新课题列表
                        if (this.currentRowObj.sno != this.rawCurrentRowObj.sno) {
                            this.$bus.$emit("projectHasChanged");
                        }
                        if (data) {
                            this.$message({
                                type: "success",
                                message: "学生信息修改成功",
                                center: true,
                            });
                            // 更新原数据
                            this.rawCurrentRowObj = { ...this.currentRowObj };
                            this.rawMajorCascaderVal = this.majorCascaderVal;
                            // 更新学生列表
                            this.getAllStudent();
                        }
                    }
                });
            },
            // 取消修改学生信息
            cancelChange(refName, refs) {
                refs[refName].resetFields();
                this.currentRowObj = { ...this.rawCurrentRowObj };
                this.majorCascaderVal = this.rawMajorCascaderVal;
            },
            // 收起表单或描述列表
            pullUp() {
                this.studentTableHeight = 650;
                this.isFormShow = false;
                this.isDescShow = false;
            },
        },
        mounted() {
            this.getAllStudent();
        },
        // 组件内路由守卫
        beforeRouteEnter(to, from, next) {
            let loginInformation = JSON.parse(
                localStorage.getItem("loginInformation")
            );
            if (loginInformation) {
                let { identity } = loginInformation;
                if (identity !== 3) {
                    MessageBox.alert("对不起，您暂无权限访问 ！", "提示", {
                        type: "warning",
                        confirmButtonText: "确定",
                        center: true,
                    });
                } else {
                    next();
                }
            }
        },
    };
</script>

<style lang="scss" scoped>
</style>