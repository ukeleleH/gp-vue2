<template>
    <!-- 通用导师批阅组件 -->
    <common-review
        :selectOptions="studentOptions"
        :headers="headers"
        :labels="labels"
        :tableDatas="allReportList"
        :dialogVisible="reviewFormVisible"
        :form="form"
        :formLabels="formLabels"
        :formRules="rules"
        @checkedValChange="searchData"
        @closeDialog="closeReview"
        @sumbitDialog="confirmReview"
    >
        <!-- 状态列 -->
        <el-table-column slot="status" label="状态" min-width="100%">
            <template slot-scope="{ row }">
                <span v-show="row.status === 0" style="color: #e6a23c">
                    待批阅
                </span>
                <span v-show="row.status === 1" style="color: #f56c6c">
                    未通过
                </span>
                <span v-show="row.status === 2" style="color: #67c23a">
                    已通过
                </span>
            </template>
        </el-table-column>
        <!-- 操作列 -->
        <el-table-column slot="operate" label="操作" min-width="100%">
            <template slot-scope="{ row }">
                <el-button type="text" @click="download(row)"> 下载 </el-button>
                <el-button type="text" @click="review(row)"> 点评 </el-button>
            </template>
        </el-table-column>
        <!-- 点评 dialog 的 state 项 -->
        <el-form-item slot="state" label="评价" prop="state">
            <el-select v-model="form.state" style="width: 100%">
                <el-option label="不通过" :value="1"> </el-option>
                <el-option label="通过" :value="2"> </el-option>
            </el-select>
        </el-form-item>
    </common-review>
</template>

<script>
    import CommonReview from "@/components/common/CommonReview.vue";
    import fileDownload from "@/mixin/fileDownload.mixin";
    import {
        tutorSearchStudentSnoName,
        tutorSearchAllReport,
        tutorGetReportBySno,
        downloadOpeningReport,
        tutorUpdateReport,
    } from "@/api/api";
    export default {
        name: "OpeningReportReview",
        components: { CommonReview },
        mixins: [fileDownload],
        data() {
            return {
                tno: "",

                studentOptions: [],
                headers: [
                    "id",
                    "fileName",
                    "sno",
                    "uploadTime",
                    "status",
                    "comment",
                ],
                labels: ["编号", "文件名", "学生姓名", "上传时间", "状态", "评语"],
                allReportList: [],

                reviewFormVisible: false,
                formLabels: ["评价", "评语"],
                form: {
                    state: "",
                    remark: "",
                },
                rules: {
                    state: [{ required: true, message: "评价不能为空" }],
                },

                rowId: "",
            };
        },
        methods: {
            // 查询我的所有学生的学号和姓名
            async getMyAllStudentSnoName() {
                let data = await tutorSearchStudentSnoName(this.tno);
                this.studentOptions = [{ sno: -1, name: "全部" }, ...data];
                // 获取表格数据
                this.getAllStudentReport();
            },
            // 获取我的学生上传的所有开题报告
            async getAllStudentReport() {
                let data = await tutorSearchAllReport(this.tno);
                if (data) {
                    this.formatData(data);
                }
            },
            // 根据学生学号查询开题报告
            async searchData(sno) {
                if (sno != -1) {
                    let data = await tutorGetReportBySno(sno);
                    if (data) {
                        this.formatData(data);
                    }
                } else {
                    this.getAllStudentReport();
                }
            },
            // 格式化查询出来的名字和日期显示格式
            formatData(data) {
                data.forEach((item) => {
                    item.uploadTime = new Date(item.uploadTime).toLocaleString();
                    this.studentOptions.forEach((innerItem) => {
                        if (innerItem.sno === item.sno) {
                            item.sno = innerItem.name;
                        }
                    });
                });
                this.allReportList = [...data];
            },
            // 下载开题报告
            async download(row) {
                let data = await downloadOpeningReport(row.id);
                if (!data) return;
                // 调用 mixin 里的方法
                this.fileDownload(data, row.fileName);
            },
            // 打开点评  dialog
            review(row) {
                this.reviewFormVisible = true;
                this.rowId = row.id;
            },
            // 关闭点评 dialog
            closeReview() {
                this.reviewFormVisible = false;
            },
            // 确定点评
            async confirmReview() {
                let data = await tutorUpdateReport(this.rowId, this.form);
                console.log(data);
                if (data) {
                    this.$message({
                        message: "点评成功",
                        center: true,
                        type: "success",
                    });
                    // 重新获取表格
                    this.getAllStudentReport();
                    this.reviewFormVisible = false;
                    this.form = {
                        state: "",
                        remark: "",
                    };
                }
            },
        },
        mounted() {
            // 获取和存储导师的工号
            const loginInformation = JSON.parse(
                localStorage.getItem("loginInformation")
            );
            this.tno = loginInformation.tno;
            // 获取下拉框的数据
            this.getMyAllStudentSnoName();
        },
    };
</script>

<style>
</style>