<template>
    <div>
        <!-- 通用表格 -->
        <common-table
            :height="650"
            :headers="tableHeaders"
            :dataList="noticeList"
            :showDetail="changeNotice"
        >
            <el-table-column
                slot="operateArea"
                width="200px"
                fixed="right"
                align="right"
            >
                <template slot="header">
                    <el-button
                        type="success"
                        @click="addNotice"
                        icon="el-icon-plus"
                    >
                        添加公告
                    </el-button>
                </template>
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        icon="el-icon-edit"
                        size="mini"
                        @click.native.prevent="changeNotice(scope.row)"
                    >
                        修改
                    </el-button>
                    <el-button
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        @click.native.prevent="deleteNotice(scope.row)"
                    >
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </common-table>
        <!-- 新增 dialog -->
        <common-dialog
            title="新增公告"
            :dialogVisible="addVisible"
            :form="addForm"
            :rules="rules"
            :labels="labels"
            @closeDialog="closeAdd"
            @submitDialog="submitAdd"
        >
        </common-dialog>
        <!-- 修改 dialog -->
        <common-dialog
            title="修改公告"
            :dialogVisible="changeVisible"
            :form="changeForm"
            :rules="rules"
            :labels="labels"
            @closeDialog="closeChange"
            @submitDialog="submitChange"
            @resetDialog="resetChange"
        >
        </common-dialog>
    </div>
</template>

<script>
    import CommonTable from "@/components/common/CommonTable.vue";
    import CommonDialog from "@/components/common/CommonDialog.vue";
    import {
        requireLeftNotice,
        adminAddNotice,
        adminChangeNotice,
        adminDeleteNotice,
    } from "@/api/api";
    import { MessageBox } from "element-ui";
    export default {
        name: "NoticeManage",
        components: { CommonTable, CommonDialog },
        data() {
            return {
                // 表格相关
                tableHeaders: ["id", "title", "content", "url"],
                noticeList: [], // 公告列表

                // dialog相关
                labels: ["title", "content", "url"],
                addVisible: false,
                changeVisible: false,
                addForm: {
                    title: "",
                    content: "",
                    url: "",
                },
                changeForm: {},
                rawChangeForm: {},
                rules: {
                    title: [
                        {
                            required: true,
                            message: "标题不能为空",
                            triggger: "blur",
                        },
                    ],
                    content: [
                        {
                            required: true,
                            message: "内容不能为空",
                            triggger: "blur",
                        },
                        { min: 10, message: "内容最少10个字", triggger: "blur" },
                    ],
                    url: [
                        {
                            required: true,
                            message: "链接不能为空",
                            triggger: "blur",
                        },
                    ],
                },
            };
        },
        methods: {
            // 获取公告列表
            async getNoticeList() {
                let data = await requireLeftNotice();
                this.noticeList = data;
            },

            // 新增按钮
            addNotice() {
                this.addVisible = true;
            },
            // 关闭新增 dialog
            closeAdd() {
                this.addVisible = false;
            },
            // 确认新增
            async submitAdd() {
                let data = await adminAddNotice(this.addForm);
                if (data) {
                    this.$message({
                        message: "公告新增成功",
                        type: "success",
                        center: true,
                    });
                    this.getNoticeList();
                    this.closeAdd();
                }
            },

            // 修改按钮
            changeNotice(row) {
                this.changeForm = { ...row };
                this.rawChangeForm = { ...row };
                this.changeVisible = true;
            },
            // 关闭修改 dialog
            closeChange() {
                this.changeVisible = false;
            },
            // 重置修改
            resetChange(refs) {
                this.changeForm = { ...this.rawChangeForm };
                refs.commonForm.resetFields();
            },
            // 确认修改
            async submitChange() {
                let flag = 0;
                for (const key in this.changeForm) {
                    if (this.changeForm[key] === this.rawChangeForm[key]) {
                        flag++;
                    }
                }
                if (flag === 4) {
                    this.$message({
                        message: "未做修改",
                        center: true,
                        type: "info",
                    });
                    return;
                }
                let data = await adminChangeNotice(this.changeForm);
                if (data) {
                    this.$message({
                        message: "修改成功",
                        center: true,
                        type: "success",
                    });
                    this.getNoticeList();
                    this.changeVisible = false;
                } else {
                    this.$message({
                        message: "修改失败",
                        center: true,
                        type: "error",
                    });
                }
            },
            // 删除
            deleteNotice(row) {
                this.$confirm("确认删除该条公告吗？", "删除公告", {
                    type: "warning",
                })
                    .then(async () => {
                        let data = await adminDeleteNotice(row.id);
                        if (data) {
                            this.$notify({
                                type: "success",
                                message: "公告删除成功",
                                title: "成功",
                            });
                            // 重新查询数据
                            this.getNoticeList();
                        }
                    })
                    .catch(() => {
                        this.$notify({
                            type: "info",
                            message: "公告已取消删除",
                            title: "取消",
                        });
                    });
            },
        },
        mounted() {
            this.getNoticeList();
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

<style lang="scss">
    .el-tooltip__popper {
        max-width: 900px !important;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>