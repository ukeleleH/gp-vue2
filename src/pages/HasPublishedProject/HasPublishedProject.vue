<template>
    <div>
        <!-- 展示课题的表格 -->
        <el-table
            :data="publishProjectList"
            stripe
            :height="tableHeight"
            class="hasPublishedProjectTable"
            @row-dblclick="changeProject"
        >
            <el-table-column
                prop="id"
                label="课题ID"
                min-width="100"
                :sortable="true"
            >
            </el-table-column>
            <el-table-column
                prop="name"
                label="题目名称"
                min-width="350"
                :sortable="true"
            >
            </el-table-column>
            <el-table-column prop="source" label="来源" min-width="140">
            </el-table-column>
            <el-table-column prop="demand" label="要求" min-width="300">
            </el-table-column>
            <el-table-column label="状态" min-width="130">
                <template slot-scope="scope">
                    <span
                        :style="
                            scope.row.studentId
                                ? { color: 'green' }
                                : { color: 'red' }
                        "
                        >{{ scope.row.studentId ? "已被选" : "未被选" }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column min-width="200" fixed="right" align="right">
                <template slot="header">
                    <el-button
                        type="success"
                        @click="addNewProject"
                        icon="el-icon-plus"
                    >
                        发布新选题
                    </el-button>
                </template>
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        icon="el-icon-edit"
                        size="mini"
                        @click.native.prevent="changeProject(scope.row)"
                    >
                        修改
                    </el-button>
                    <el-button
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        @click.native.prevent="deleteProject(scope.row)"
                    >
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 课题详情的描述列表 (修改课题信息时) -->
        <template>
            <el-descriptions
                :title="description.name"
                :column="3"
                class="updateDescription"
                v-show="isDescShow"
                border
            >
                <template slot="extra">
                    <el-button
                        type="primary"
                        size="small"
                        @click="pullUpDetail"
                    >
                        收起
                    </el-button>
                </template>
                <el-descriptions-item label="课题ID">
                    <el-input disabled v-model="description.id"></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="名称">
                    <el-input
                        v-model="description.name"
                        maxlength="30"
                        show-word-limit
                    ></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="来源">
                    <el-select
                        v-model="description.source"
                        placeholder="请选择"
                    >
                        <el-option label="省部级以上" value="省部级以上">
                        </el-option>
                        <el-option label="横向且有经费" value="横向且有经费">
                        </el-option>
                        <el-option label="自选" value="自选"> </el-option>
                        <el-option label="市厅级" value="市厅级"> </el-option>
                    </el-select>
                </el-descriptions-item>
                <el-descriptions-item label="学生学号">
                    <!-- 存在学生学号, 则表示已被选, 不可以修改 -->
                    <template v-if="description.studentId">
                        <el-input
                            disabled
                            v-model="description.studentId"
                        ></el-input>
                    </template>
                    <!-- 否则, 未被选 -->
                    <template v-else>
                        <span style="color: red">未被选</span>
                    </template>
                </el-descriptions-item>
                <el-descriptions-item label="性质">
                    <el-select
                        v-model="description.nature"
                        placeholder="请选择"
                    >
                        <el-option label="实际应用" value="实际应用">
                        </el-option>
                        <el-option label="理论研究" value="理论研究">
                        </el-option>
                        <el-option
                            label="实际应用与理论研究"
                            value="实际应用与理论研究"
                        >
                        </el-option>
                    </el-select>
                </el-descriptions-item>
                <el-descriptions-item label="要求">
                    <el-input
                        v-model="description.demand"
                        maxlength="255"
                        show-word-limit
                    ></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="内容" :span="3">
                    <el-input
                        type="textarea"
                        v-model="description.content"
                        maxlength="255"
                        show-word-limit
                        :autosize="{ minRows: 2, maxRows: 6 }"
                    ></el-input>
                </el-descriptions-item>
            </el-descriptions>
            <!-- 修改的按钮 -->
            <div class="updateBtn_container" v-show="isDescShow">
                <el-button
                    type="success"
                    plain
                    size="small"
                    @click="confirmChange"
                    >确认修改</el-button
                >
                <el-button
                    type="warning"
                    plain
                    size="small"
                    @click="cancelChange"
                    >取消修改</el-button
                >
            </div>
        </template>

        <!-- 添加新课题的描述列表（表单） -->
        <template>
            <el-form :model="newProject" :rules="rules" ref="newProject">
                <el-descriptions
                    :column="3"
                    class="addDescription"
                    v-show="isNewShow"
                    border
                >
                    <template slot="extra">
                        <el-button
                            type="primary"
                            size="small"
                            @click="pullUpDetail"
                        >
                            收起
                        </el-button>
                    </template>
                    <el-descriptions-item label="名称">
                        <el-form-item prop="name">
                            <el-input
                                v-model="newProject.name"
                                maxlength="30"
                                show-word-limit
                            ></el-input>
                        </el-form-item>
                    </el-descriptions-item>
                    <el-descriptions-item label="来源">
                        <el-form-item prop="source">
                            <el-select
                                v-model="newProject.source"
                                placeholder="请选择"
                            >
                                <el-option
                                    label="省部级以上"
                                    value="省部级以上"
                                >
                                </el-option>
                                <el-option
                                    label="横向且有经费"
                                    value="横向且有经费"
                                >
                                </el-option>
                                <el-option label="自选" value="自选">
                                </el-option>
                                <el-option label="市厅级" value="市厅级">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-descriptions-item>
                    <el-descriptions-item label="性质">
                        <el-form-item prop="nature">
                            <el-select
                                name="nature"
                                v-model="newProject.nature"
                                placeholder="请选择"
                            >
                                <el-option label="实际应用" value="实际应用">
                                </el-option>
                                <el-option label="理论研究" value="理论研究">
                                </el-option>
                                <el-option
                                    label="实际应用与理论研究"
                                    value="实际应用与理论研究"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-descriptions-item>
                    <el-descriptions-item label="要求">
                        <el-form-item prop="demand">
                            <el-input
                                v-model="newProject.demand"
                                maxlength="255"
                                show-word-limit
                            ></el-input>
                        </el-form-item>
                    </el-descriptions-item>
                    <el-descriptions-item label="内容" :span="3">
                        <el-form-item prop="content">
                            <el-input
                                type="textarea"
                                v-model="newProject.content"
                                maxlength="255"
                                show-word-limit
                                :autosize="{ minRows: 2, maxRows: 6 }"
                            ></el-input>
                        </el-form-item>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <!-- 发布的按钮 -->
                        <el-form-item class="addBtn_container">
                            <el-button
                                type="success"
                                plain
                                size="small"
                                @click="confirmPublish('newProject')"
                                >确认发布</el-button
                            >
                            <el-button
                                type="warning"
                                plain
                                size="small"
                                @click="cancelPublish('newProject')"
                                >重置</el-button
                            >
                        </el-form-item>
                    </el-descriptions-item>
                </el-descriptions>
            </el-form>
        </template>
    </div>
</template>

<script>
    import {
        tutorDeleteProject,
        tutorIsUniqueProjectName,
        tutorChangeProjectInfo,
        tutorPublishNewProject,
        tutorGetMyPublishProject,
    } from "../../api/api";
    export default {
        name: "HasPublishedProject",
        data() {
            // 自定义校验规则
            let checkNewProjectName = (_, value, callback) => {
                if (!value) {
                    callback(new Error("名称不能为空"));
                } else {
                    // 查询是否存在
                    tutorIsUniqueProjectName(value.trim()).then((data) => {
                        if (data) {
                            callback(new Error("课题名称已存在"));
                        } else {
                            callback();
                        }
                    });
                }
            };
            return {
                tableHeight: 650,
                // 表格的数据
                publishProjectList: [],
                // 描述列表的数据
                description: {},
                // 原始的行数据
                rawRowData: {},
                // 新增课题的数据
                newProject: {
                    name: "",
                    source: "",
                    nature: "",
                    content: "",
                    demand: "",
                },
                // 描述列表是否显示
                isDescShow: false,
                // 新增列表的是否显示
                isNewShow: false,
                // 校验规则
                rules: {
                    name: [
                        {
                            validator: checkNewProjectName,
                            trigger: "blur",
                        },
                    ],
                    source: [
                        {
                            required: true,
                            message: "请选择来源",
                            trigger: "change",
                        },
                    ],
                    nature: [
                        {
                            required: true,
                            message: "请选择性质",
                            trigger: "change",
                        },
                    ],
                    demand: [
                        {
                            required: true,
                            message: "要求不能为空",
                            trigger: "blur",
                        },
                    ],
                    content: [
                        {
                            required: true,
                            message: "内容不能为空",
                            trigger: "blur",
                        },
                    ],
                },
            };
        },
        methods: {
            // 修改课题按钮 (双击和点击查看按钮)
            changeProject(row) {
                this.tableHeight = 330;
                this.isDescShow = true;
                this.isNewShow = false;
                // 将行的数据存入 description (这里采用解构赋值, 不然是将对象的引用地址赋值给了 description)
                this.description = { ...row };
                this.rawRowData = { ...row };
            },

            // 删除课题
            deleteProject(row) {
                this.$confirm("确认删除改选题吗？", "删除课题", {
                    type: "warning",
                })
                    .then(() => {
                        tutorDeleteProject(row.id).then((data) => {
                            if (data) {
                                this.$notify({
                                    type: "success",
                                    message: "课题删除成功",
                                    title: "成功",
                                });
                                this.getMyHasPublished();
                                this.$bus.$emit("projectHasChanged");
                            }
                        });
                    })
                    .catch(() => {
                        this.$notify({
                            type: "info",
                            message: "课题取消删除",
                            title: "取消",
                        });
                    });
            },

            // 点击确认修改按钮
            async confirmChange() {
                let { name, nature, source, demand, content } = this.description;
                if (
                    name === this.rawRowData.name &&
                    nature === this.rawRowData.nature &&
                    source === this.rawRowData.source &&
                    demand === this.rawRowData.demand &&
                    content === this.rawRowData.content
                ) {
                    this.$message({
                        message: "课题信息未作修改",
                        type: "info",
                        center: true,
                    });
                    return;
                }
                // 查询该选题题目是否是我唯一发布
                let project = await tutorIsUniqueProjectName(name.trim());

                const loginInformation = localStorage.getItem("loginInformation");
                const { id } = JSON.parse(loginInformation);

                if (project && project.tutorId !== id) {
                    // 表示该课题题目别的导师已发布
                    this.$message({
                        message: "课题信息修改失败，题目已存在",
                        type: "error",
                        center: true,
                    });
                } else if (project && project.id !== this.rawRowData.id) {
                    // 表示该课题题目自己已发布
                    this.$message({
                        message: "课题信息修改失败，题目已存在",
                        type: "error",
                        center: true,
                    });
                } else {
                    // 否则发送请求去修改课题信息
                    let data = await tutorChangeProjectInfo(this.description);
                    if (data) {
                        this.$message({
                            message: "课题信息修改成功",
                            type: "success",
                            center: true,
                        });
                        // 原始行数据也要更新
                        this.rawRowData = { ...this.description };
                        // 调用方法, 更新我发布的课题的表格数据
                        this.getMyHasPublished();
                        // 触发全局事件总线中的自定义事件, 更新全系的课题表格数据
                        this.$bus.$emit("projectHasChanged");
                    }
                }
            },

            // 点击取消修改按钮
            cancelChange() {
                this.description = { ...this.rawRowData };
            },

            // 发布新课题
            addNewProject() {
                this.tableHeight = 330;
                this.isNewShow = true;
                this.isDescShow = false;
            },

            // 确认发布
            confirmPublish(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 如果校验通过，则发送请求
                        const { id: tutorId } = JSON.parse(
                            localStorage.getItem("loginInformation")
                        );
                        tutorPublishNewProject({
                            ...this.newProject,
                            tutorId,
                        }).then((data) => {
                            if (data) {
                                this.$message({
                                    type: "success",
                                    message: "新课题发布成功",
                                    center: true,
                                });
                                this.getMyHasPublished();
                                this.$bus.$emit("projectHasChanged");
                            }
                        });
                    }
                });
            },

            // 重置（取消发布）
            cancelPublish(formName) {
                this.$refs[formName].resetFields();
            },

            // 收起详情展示
            pullUpDetail() {
                this.isDescShow = false;
                this.isNewShow = false;
                this.tableHeight = 650;
            },

            // 封装【获取我发布的课题】的方法
            getMyHasPublished() {
                // 获取登录信息中我的id
                const loginInformation = localStorage.getItem("loginInformation");
                const { id } = JSON.parse(loginInformation);
                // 发送请求
                tutorGetMyPublishProject(id).then((data) => {
                    this.publishProjectList = [...data];
                });
            },
        },

        mounted() {
            // 调用方法
            this.getMyHasPublished();
        },
    };
</script>

<style lang="scss" scoped>
    .hasPublishedProjectTable {
        width: 100%;
        user-select: none;
    }
    .updateDescription,
    .addDescription {
        margin-top: 50px;
    }
    .updateBtn_container,
    .addBtn_container {
        width: 250px;
        margin: 0 auto;
        margin-top: 10px;
        display: flex;
        justify-content: space-around;
    }
</style>