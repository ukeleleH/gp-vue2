<template>
    <div class="opening_report_container">
        <div class="title">报告上传</div>
        <el-row style="height: 250px">
            <!-- 上传组件 -->
            <el-col :span="6">
                <el-upload
                    action="/api/gp/student/upload"
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
                        <el-button
                            type="primary"
                            @click="submit('openingReportForm')"
                        >
                            上传
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

        <div class="title" style="margin-top: 50px">已上传的开题报告</div>
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="orderNumber" label="序号" min-width="180">
            </el-table-column>
            <el-table-column prop="name" label="名称" min-width="180">
            </el-table-column>
            <el-table-column label="审核状态" min-width="180">
                <span
                    :style="
                        tableData.auditState
                            ? { color: 'green' }
                            : { color: 'red' }
                    "
                >
                    {{ tableData.auditState ? "已审核" : "待审核" }}
                </span>
            </el-table-column>
            <el-table-column label="通过状态" min-width="180">
                <span
                    :style="
                        tableData.passState
                            ? { color: 'green' }
                            : { color: 'red' }
                    "
                >
                    {{
                        tableData.passState
                            ? "已通过"
                            : tableData.passState === false
                            ? "未通过"
                            : ""
                    }}
                </span>
            </el-table-column>
            <el-table-column label="操作">
                <el-button type="text">下载</el-button>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import { MessageBox } from "element-ui";
    export default {
        name: "OpeningReport",
        data() {
            var checkSummary = (_, value, callback) => {
                if (!value) {
                    callback(new Error("个人总结不能为空"));
                } else if (value.length < 10 || value.length > 255) {
                    callback(new Error("请填写至少10个字"));
                } else {
                    callback();
                }
            };
            return {
                // 开题报告的表单
                openingReportForm: {
                    summary: "",
                },
                // 验证规则
                rules: {
                    summary: [{ validator: checkSummary, trigger: "blur" }],
                },
                // 已提交的表格数据
                tableData: [
                    {
                        orderNumber: 1,
                        name: "我的开题报告",
                        auditState: true,
                        passState: true,
                    },
                ],
            };
        },
        methods: {
            submit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$refs.upload.submit();
                    } else {
                        return false;
                    }
                });
            },
        },
        mounted() {},
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