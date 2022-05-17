<template>
    <div>
        <!-- 学科部下拉选择框 -->
        <el-select v-model="departmentVal" placeholder="请选择学科部">
            <el-option
                v-for="item in departmentOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            >
            </el-option>
        </el-select>
        <!-- 专业的表格 -->
        <common-table
            :height="610"
            :headers="headers"
            :dataList="majorList"
            :showDetail="changeMajor"
        >
            <el-table-column
                slot="d_id"
                min-width="250px"
                label="所属学科部"
                :show-overflow-tooltip="true"
            >
                <template slot-scope="scope">
                    {{ departmentOptions[scope.row.d_id].name }}
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
                        @click="addMajor"
                        icon="el-icon-plus"
                    >
                        新增专业
                    </el-button>
                </template>
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        icon="el-icon-edit"
                        size="mini"
                        @click.native.prevent="changeMajor(scope.row)"
                    >
                        修改
                    </el-button>
                    <el-button
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        @click.native.prevent="deleteMajor(scope.row)"
                    >
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </common-table>
        <!-- 新增的 dialog -->
        <common-dialog
            title="新增专业"
            :dialogVisible="addVisible"
            :form="addForm"
            :rules="rules"
            :labels="labels"
            @closeDialog="closeAdd"
            @submitDialog="submitAdd"
        >
            <el-form-item slot="d_id" label="所属学科部" prop="d_id">
                <el-select v-model="addForm.d_id" style="width: 100%">
                    <el-option
                        v-for="item in departmentOptions"
                        :disabled="item.id === 0 ? true : false"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item slot="type" label="下属班级数量" prop="type">
                <el-select v-model="addForm.type" style="width: 100%">
                    <el-option
                        v-for="item in [1, 2, 3, 4, 5, 6]"
                        :key="item"
                        :label="item"
                        :value="item"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
        </common-dialog>
        <!-- 修改的 dialog -->
        <common-dialog
            title="修改专业"
            :dialogVisible="changeVisible"
            :form="changeForm"
            :rules="rules"
            :labels="labels"
            @closeDialog="closeChange"
            @resetDialog="resetChange"
            @submitDialog="submitChange"
        >
            <el-form-item slot="d_id" label="所属学科部" prop="d_id">
                <el-select v-model="changeForm.d_id" style="width: 100%">
                    <el-option
                        v-for="item in departmentOptions"
                        :disabled="item.id === 0 ? true : false"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item slot="type" label="下属班级数量" prop="type">
                <el-select v-model="changeForm.type" style="width: 100%">
                    <el-option
                        v-for="item in [1, 2, 3, 4, 5, 6]"
                        :key="item"
                        :label="item"
                        :value="item"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
        </common-dialog>
    </div>
</template>

<script>
    import CommonTable from "@/components/common/CommonTable.vue";
    import CommonDialog from "@/components/common/CommonDialog.vue";
    import {
        systemSearchDepartment,
        systemSearchMajor,
        systemSearchMajorByDid,
        adminAddMajor,
        adminChangeMajor,
        adminDeleteMajor,
    } from "@/api/api";
    export default {
        name: "MajorClassManage",
        components: { CommonTable, CommonDialog },
        data() {
            return {
                departmentOptions: [],
                departmentVal: "",

                majorList: [],
                headers: ["id", "name", "d_id", "type"],

                addVisible: false,
                changeVisible: false,
                labels: ["name", "d_id", "type"],
                addForm: {
                    name: "",
                    d_id: "",
                    type: "",
                },
                changeForm: {},
                rawChangeForm: {},
                rules: {
                    name: [
                        {
                            required: true,
                            message: "名称不能为空",
                            trigger: "blur",
                        },
                    ],
                    d_id: [
                        {
                            required: true,
                            message: "所属学科部不能为空",
                            trigger: "blur",
                        },
                    ],
                    type: [
                        {
                            required: true,
                            message: "下属班级数量不能为空",
                            trigger: "blur",
                        },
                    ],
                },
            };
        },
        watch: {
            departmentVal(newVal) {
                this.getMajor(newVal);
            },
        },
        methods: {
            // 查询所有学科部信息
            async getAllDepartment() {
                let data = await systemSearchDepartment();
                this.departmentOptions = [{ id: 0, name: "全部" }, ...data];
            },
            // 查询专业数据
            async getMajor(d_id) {
                if (d_id) {
                    let data = await systemSearchMajorByDid(d_id);
                    this.majorList = data;
                } else {
                    // 查询全部专业
                    let data = await systemSearchMajor();
                    this.majorList = data;
                }
            },
            // 新增专业
            addMajor() {
                this.addVisible = true;
            },
            // 关闭新增
            closeAdd() {
                this.addVisible = false;
            },
            // 提交新增
            async submitAdd() {
                let data = await adminAddMajor(this.addForm);
                if (data) {
                    this.$message({
                        message: "新增成功",
                        center: true,
                        type: "success",
                    });
                    this.getMajor(this.departmentVal);
                    this.addVisible = false;
                } else {
                    this.$message({
                        message: "新增失败",
                        center: true,
                        type: "error",
                    });
                }
            },
            // 修改按钮
            changeMajor(row) {
                this.changeForm = { ...row };
                this.rawChangeForm = { ...row };
                this.changeVisible = true;
            },
            // 关闭修改
            closeChange() {
                this.changeVisible = false;
            },
            // 重置修改
            resetChange(refs) {
                this.changeForm = { ...this.rawChangeForm };
                refs.commonForm.resetFields();
            },
            // 提交修改
            async submitChange() {
                let data = await adminChangeMajor(this.changeForm);
                if (data) {
                    this.$message({
                        message: "修改成功",
                        center: true,
                        type: "success",
                    });
                    this.getMajor(this.departmentVal);
                    this.changeVisible = false;
                } else {
                    this.$message({
                        message: "修改失败",
                        center: true,
                        type: "error",
                    });
                }
            },
            // 删除专业
            async deleteMajor(row) {
                this.$confirm("确认删除该条专业吗？", "删除专业", {
                    type: "warning",
                })
                    .then(async () => {
                        let data = await adminDeleteMajor(row.id);
                        if (data) {
                            this.$notify({
                                type: "success",
                                message: "公告删除成功",
                                title: "成功",
                            });
                            // 重新查询数据
                            this.getMajor(this.departmentVal);
                        }
                    })
                    .catch(() => {
                        this.$notify({
                            type: "info",
                            message: "专业已取消删除",
                            title: "取消",
                        });
                    });
            },
        },
        mounted() {
            this.getAllDepartment();
        },
    };
</script>

<style>
</style>