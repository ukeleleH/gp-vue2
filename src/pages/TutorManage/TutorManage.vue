<template>
    <div>
        <!-- 通用表格 -->
        <common-tabel
            :height="tutorTableHeight"
            :headers="tutorTableDescHeaders"
            :dataList="allTutorList"
            :showDetail="changeTutor"
        >
            <el-table-column slot="password" label="密码" width="180px">
                <template slot-scope="{ row }">
                    <el-input
                        v-model="row.password"
                        type="password"
                        disabled
                        style="width: 70%"
                    >
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column
                slot="isInsideSchool"
                label="是否本校"
                width="100px"
            >
                <template slot-scope="{ row }">
                    <span
                        :style="
                            row.isInsideSchool
                                ? { color: 'green' }
                                : { color: 'red' }
                        "
                    >
                        {{ row.isInsideSchool ? "校内导师" : "校外聘请" }}
                    </span>
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
                        @click="addTutor"
                        icon="el-icon-plus"
                    >
                        添加导师信息
                    </el-button>
                </template>
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        icon="el-icon-edit"
                        size="mini"
                        @click.native.prevent="changeTutor(scope.row)"
                    >
                        修改
                    </el-button>
                    <el-button
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        @click.native.prevent="deleteTutor(scope.row)"
                    >
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </common-tabel>
        <!-- 通用描述列表 -->
        <common-desc
            v-show="isDescShow"
            :labels="tutorTableDescHeaders"
            :descObj="currentRowObj"
            :pullUp="pullUp"
            :confirmChange="confirmChange"
            :cancelChange="cancelChange"
        >
            <el-select
                slot="gender"
                slot-scope="{ descObj }"
                v-model="descObj['gender']"
                placeholder="请选择"
            >
                <el-option label="男" value="男"> </el-option>
                <el-option label="女" value="女"> </el-option>
            </el-select>
            <el-select
                slot="title"
                slot-scope="{ descObj }"
                v-model="descObj['title']"
                placeholder="请选择"
            >
                <el-option label="助教" value="助教"> </el-option>
                <el-option label="讲师" value="讲师"> </el-option>
                <el-option label="副教授" value="副教授"> </el-option>
                <el-option label="教授" value="教授"> </el-option>
            </el-select>
            <el-select
                slot="degree"
                slot-scope="{ descObj }"
                v-model="descObj['degree']"
                placeholder="请选择"
            >
                <el-option label="本科" value="本科"> </el-option>
                <el-option label="硕士" value="硕士"> </el-option>
                <el-option label="博士" value="博士"> </el-option>
                <el-option label="博士后" value="博士后"> </el-option>
            </el-select>
            <el-select
                slot="isInsideSchool"
                slot-scope="{ descObj }"
                v-model="descObj['isInsideSchool']"
                placeholder="请选择"
            >
                <el-option label="校外聘请" :value="0"> 校外聘请 </el-option>
                <el-option label="校内导师" :value="1"> 校内导师 </el-option>
            </el-select>
        </common-desc>
        <!-- 通用表单 -->
        <common-form
            v-show="isFormShow"
            :labels="tutorFormLabels"
            :addForm="tutorForm"
            :addRules="tutorFormRules"
            :refName="'newTutor'"
            :pullUp="pullUp"
            :confirmAdd="confirmAdd"
            :cancelAdd="cancelAdd"
        >
            <el-form-item slot="gender" slot-scope="{ addForm }" prop="gender">
                <el-select v-model="addForm['gender']" placeholder="请选择">
                    <el-option label="男" value="男"> </el-option>
                    <el-option label="女" value="女"> </el-option>
                </el-select>
            </el-form-item>
            <el-form-item slot="title" slot-scope="{ addForm }" prop="title">
                <el-select v-model="addForm['title']" placeholder="请选择">
                    <el-option label="助教" value="助教"> </el-option>
                    <el-option label="讲师" value="讲师"> </el-option>
                    <el-option label="副教授" value="副教授"> </el-option>
                    <el-option label="教授" value="教授"> </el-option>
                </el-select>
            </el-form-item>
            <el-form-item slot="degree" slot-scope="{ addForm }" prop="degree">
                <el-select v-model="addForm['degree']" placeholder="请选择">
                    <el-option label="本科" value="本科"> </el-option>
                    <el-option label="硕士" value="硕士"> </el-option>
                    <el-option label="博士" value="博士"> </el-option>
                    <el-option label="博士后" value="博士后"> </el-option>
                </el-select>
            </el-form-item>
            <el-form-item slot="isInsideSchool" slot-scope="{ addForm }">
                <el-select
                    v-model="addForm['isInsideSchool']"
                    placeholder="请选择"
                >
                    <el-option label="校外聘请" :value="0">
                        校外聘请
                    </el-option>
                    <el-option label="校内导师" :value="1">
                        校内导师
                    </el-option>
                </el-select>
            </el-form-item>
        </common-form>
    </div>
</template>

<script>
    // 引入组件
    import CommonTabel from "@/components/common/CommonTable.vue";
    import CommonForm from "@/components/common/CommonForm.vue";
    import CommonDesc from "@/components/common/CommonDesc.vue";
    // 引入 api 接口
    import {
        adminSelectAllTutor,
        adminIsUniqueTutorId,
        adminDeleteTutor,
        adminAddTutor,
        adminChangeTutor,
    } from "@/api/api";
    export default {
        name: "TutorManage",
        components: { CommonTabel, CommonForm, CommonDesc },
        data() {
            let checkTutorId = (rule, value, callback) => {
                let reg = /^\d{8,10}$/;
                if (!value) {
                    callback(new Error("请输入导师工号"));
                } else if (!reg.test(value)) {
                    callback(new Error("工号只能是数字,且至少8位"));
                } else {
                    // 查询是否存在
                    adminIsUniqueTutorId(value.trim()).then((data) => {
                        console.log(data);
                        if (data) {
                            callback(new Error("工号已存在"));
                        } else {
                            callback();
                        }
                    });
                }
            };
            let validatePass = (rule, value, callback) => {
                let reg = /^\w{8,20}$/;
                if (value === "") {
                    callback(new Error("请配置导师初始密码"));
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
                    callback(new Error("请输入导师手机号"));
                } else if (value.length !== 11) {
                    callback(new Error("格式不正确，请输入11位手机号"));
                } else if (!reg.test(value)) {
                    callback(new Error("格式不正确，手机号以13/4/5/7/8开头"));
                } else {
                    callback();
                }
            };
            let checkQQ = (rule, value, callback) => {
                let reg = /^\d{6,12}$/;
                if (!reg.test(value)) {
                    callback(new Error("QQ号只能是数字,且为6-12位"));
                } else {
                    callback();
                }
            };
            let checkIntro = (rule, value, callback) => {
                if (value.trim() === "") {
                    callback(new Error("导师介绍不能为空"));
                } else if (value.length < 10) {
                    callback(new Error("请至少输入10个字"));
                } else {
                    callback();
                }
            };
            return {
                isDescShow: false,
                isFormShow: false,

                currentRowObj: {},
                rowCurrentRowObj: {},

                tutorTableHeight: 650,
                tutorTableDescHeaders: [],
                allTutorList: [],

                tutorFormLabels: [
                    "id",
                    "password",
                    "name",
                    "tel",
                    "gender",
                    "qq",
                    "title",
                    "degree",
                    "isInsideSchool",
                    "introduction",
                ],
                tutorForm: {
                    id: "",
                    password: "",
                    name: "",
                    tel: "",
                    gender: "",
                    qq: "",
                    title: "",
                    degree: "",
                    inInsideSchool: "",
                    introduction: "",
                },
                tutorFormRules: {
                    id: [{ validator: checkTutorId, trigger: "blur" }],
                    password: [{ validator: validatePass, trigger: "blur" }],
                    tel: [{ validator: checkTel, trigger: "blur" }],
                    qq: [{ validator: checkQQ, trigger: "blur" }],
                    introduction: [{ validator: checkIntro, trigger: "blur" }],
                    name: [
                        {
                            required: true,
                            message: "请输入导师姓名",
                            trigger: "blur",
                        },
                    ],
                    gender: [
                        {
                            required: true,
                            message: "请选择导师性别",
                        },
                    ],
                    title: [
                        {
                            required: true,
                            message: "请选择导师职称",
                        },
                    ],
                    degree: [
                        {
                            required: true,
                            message: "请选择导师学位",
                        },
                    ],
                    isInsideSchool: [
                        {
                            required: true,
                            message: "请选择导师是否本校",
                        },
                    ],
                },
            };
        },
        methods: {
            // 查询导师列表的方法
            async getAllTutor() {
                let data = await adminSelectAllTutor();
                if (data) {
                    let tempTableHeaders = [];
                    for (let v in data[0]) {
                        tempTableHeaders.push(v);
                    }
                    this.tutorTableDescHeaders = tempTableHeaders;
                }
                this.allTutorList = data;
            },
            // 点击修改按钮
            changeTutor(row) {
                this.tutorTableHeight = 330;
                this.isFormShow = false;
                this.isDescShow = true;
                this.currentRowObj = { ...row };
                this.rowCurrentRowObj = { ...row };
            },
            // 确认修改导师信息
            async confirmChange() {
                const {
                    id,
                    password,
                    name,
                    tel,
                    gender,
                    qq,
                    title,
                    degree,
                    isInsideSchool,
                    intruduction,
                } = this.currentRowObj;
                if (
                    id === this.rowCurrentRowObj.id &&
                    password === this.rowCurrentRowObj.password &&
                    name === this.rowCurrentRowObj.name &&
                    tel === this.rowCurrentRowObj.tel &&
                    gender === this.rowCurrentRowObj.gender &&
                    qq === this.rowCurrentRowObj.qq &&
                    title === this.rowCurrentRowObj.title &&
                    degree === this.rowCurrentRowObj.degree &&
                    isInsideSchool === this.rowCurrentRowObj.isInsideSchool &&
                    intruduction === this.rowCurrentRowObj.intruduction
                ) {
                    this.$message({
                        message: "导师信息未作修改",
                        type: "info",
                        center: true,
                    });
                    return;
                }
                // 发送请求，修改导师信息
                try {
                    let data = await adminChangeTutor(this.currentRowObj);
                    if (data) {
                        this.$message({
                            type: "success",
                            message: "导师信息修改成功",
                            center: true,
                        });
                        // 更新原数据
                        this.rowCurrentRowObj = { ...this.currentRowObj };
                        // 更新列表
                        this.getAllTutor();
                    }
                } catch {
                    this.$message({
                        type: "error",
                        message: "导师信息修改失败",
                        center: true,
                    });
                }
            },
            // 取消修改导师信息
            cancelChange() {
                this.currentRowObj = { ...this.rowCurrentRowObj };
            },
            // 新增导师信息
            addTutor() {
                this.tutorTableHeight = 330;
                this.isFormShow = true;
                this.isDescShow = false;
            },
            // 确认新增导师信息
            confirmAdd(refName, refs) {
                refs[refName].validate(async (valid) => {
                    if (valid) {
                        // 如果校验通过，则发送请求
                        let data = await adminAddTutor(this.tutorForm);
                        if (data) {
                            this.$message({
                                type: "success",
                                message: "导师信息添加成功",
                                center: true,
                            });
                            this.getAllTutor();
                        }
                    }
                });
            },
            // 重置表单，取消添加
            cancelAdd(refName, refs) {
                refs[refName].resetFields();
            },
            // 删除导师
            deleteTutor(row) {
                this.$confirm("确认删除该导师信息吗？", "删除导师", {
                    type: "warning",
                })
                    .then(() => {
                        adminDeleteTutor(row.id).then((data) => {
                            if (data) {
                                this.$notify({
                                    type: "success",
                                    message: "导师信息删除成功",
                                    title: "成功",
                                });
                                // 重新查询数据
                                this.getAllTutor();
                            }
                        });
                    })
                    .catch(() => {
                        this.$notify({
                            type: "info",
                            message: "导师信息已取消删除",
                            title: "取消",
                        });
                    });
            },
            // 收起表单或描述列表
            pullUp() {
                this.tutorTableHeight = 650;
                this.isFormShow = false;
                this.isDescShow = false;
            },
        },
        async mounted() {
            this.getAllTutor();
        },
    };
</script>

<style>
</style>