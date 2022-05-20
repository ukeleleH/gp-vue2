<template>
    <div class="opening_report_container">
        <div class="title">报告上传</div>
        <el-row style="height: 250px">
            <!-- 上传组件 -->
            <el-col :span="6">
                <el-upload
                    :action="`/api/gp/student/uploadOpeningReport?sno=${sno}&tno=${tno}`"
                    drag
                    accept=".doc,.docx"
                    :limit="1"
                    :auto-upload="false"
                    ref="upload"
                >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                        将文件拖到此处，或<em>点击上传</em>
                    </div>
                    <div class="el-upload__tip" slot="tip">
                        只能上传doc/docx文件，且不超过3M
                    </div>
                </el-upload>
            </el-col>
            <!-- 表单 -->
            <el-col :span="8" :offset="1">
                <el-form
                    :model="openingReportForm"
                    ref="openingReportForm"
                    :rules="rules"
                >
                    <el-form-item label="个人总结" prop="summary">
                        <el-input
                            type="textarea"
                            resize="none"
                            :rows="4"
                            placeholder="请填写个人总结"
                            maxlength="255"
                            show-word-limit
                            v-model="openingReportForm.summary"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submit">
                            上传
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

        <div class="title" style="margin-top: 50px">已上传的开题报告</div>
        <el-table
            height="250"
            :data="openingReportList"
            stripe
            style="width: 100%"
        >
            <el-table-column label="序号" type="index" min-width="250px">
            </el-table-column>
            <el-table-column prop="fileName" label="文件名" min-width="180">
            </el-table-column>
            <el-table-column label="状态" min-width="180">
                <template slot-scope="{ row }">
                    <span v-if="row.status === 0" style="color: #e6a23c">
                        待批阅
                    </span>
                    <span v-if="row.status === 1" style="color: #f56c6c">
                        未通过
                    </span>
                    <span v-if="row.status === 2" style="color: #67c23a">
                        已通过
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="上传时间" prop="uploadTime" min-width="180">
            </el-table-column>
            <el-table-column label="评语" prop="comment" min-width="180">
            </el-table-column>
            <el-table-column label="操作" min-width="180">
                <template slot-scope="{ row }">
                    <el-button type="text" @click="download(row)">
                        下载
                    </el-button>
                    <el-button type="text" @click="deleteReport(row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import { MessageBox } from "element-ui";
    import {
        getMyOpeningReport,
        downloadOpeningReport,
        deleteOpeningReport,
        selectTutorTno,
    } from "@/api/api";
    import fileDownload from "@/mixin/fileDownload.mixin";
    export default {
        name: "OpeningReport",
        mixins: [fileDownload],
        data() {
            var checkSummary = (_, value, callback) => {
                if (!value) {
                    callback(new Error("个人总结不能为空"));
                } else if (value.length < 10) {
                    callback(new Error("请填写至少10个字"));
                } else {
                    callback();
                }
            };
            return {
                // 学生学号
                sno: "",
                // 导师工号
                tno: "",
                // 开题报告的表单
                openingReportForm: {
                    summary: "",
                },
                // 验证规则
                rules: {
                    summary: [{ validator: checkSummary, trigger: "blur" }],
                },
                // 已提交的开题报告列表
                openingReportList: [],
            };
        },
        methods: {
            // 上传
            submit() {
                this.$refs.openingReportForm.validate((valid) => {
                    if (valid) {
                        this.$refs.upload.submit();
                        setTimeout(() => {
                            this.getMyOpeningReportList();
                        }, 500);
                    } else {
                        return false;
                    }
                });
            },
            // 下载
            async download(row) {
                let data = await downloadOpeningReport(row.id);
                if (!data) return;
                this.fileDownload(data, row.fileName);
            },
            // 删除
            deleteReport(row) {
                this.$confirm("此操作将永久删除，确认继续吗？", "删除开题报告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                    .then(async () => {
                        // 发送请求，删除
                        let data = await deleteOpeningReport(row.id);
                        if (data) {
                            this.$message({
                                type: "success",
                                center: true,
                                message: "删除成功",
                            });
                            this.getMyOpeningReportList();
                        }
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            center: true,
                            message: "已取消删除",
                        });
                    });
            },
            // 查询我上传的开题报告
            async getMyOpeningReportList() {
                let data = await getMyOpeningReport(this.sno);
                let newData = data.map((item) => {
                    item.uploadTime = new Date(item.uploadTime).toLocaleString();
                    return item;
                });
                if (data) {
                    this.openingReportList = [...newData];
                }
            },
            // 根据学生学号在课题表里查询导师的学号
            async getTutorTno() {
                let data = await selectTutorTno(this.sno);
                this.tno = data;
            },
        },
        mounted() {
            // 获取登录信息
            let loginInformation = JSON.parse(
                localStorage.getItem("loginInformation")
            );
            // 存储学号
            this.sno = loginInformation.sno;
            // 查询我上传的开题报告
            this.getMyOpeningReportList();
            // 查询导师学号
            this.getTutorTno();
        },
        beforeRouteEnter(to, from, next) {
            let loginInformation = JSON.parse(
                localStorage.getItem("loginInformation")
            );
            if (loginInformation) {
                let { identity } = loginInformation;
                if (identity !== 1) {
                    MessageBox.alert(
                        "对不起，您当前要访问的是学生界面，您暂无权限！",
                        "提示",
                        {
                            type: "warning",
                            confirmButtonText: "确定",
                            center: true,
                        }
                    );
                } else {
                    next();
                }
            }
        },
    };
</script>

<style lang="scss" scoped>
    .opening_report_container {
        margin-top: 20px;
        .title {
            color: #303133;
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 20px;
        }
    }
</style>