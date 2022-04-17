<template>
    <div>
        <el-breadcrumb
            separator-class="el-icon-arrow-right"
            class="breadcrumb"
            v-show="$route.name === 'projectDetail'"
        >
            <el-breadcrumb-item :to="{ path: '/all_project' }">
                <span> 全部选题 </span>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                <span class="breadcrumb_item"> 选题详情 </span>
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div
            v-if="$route.path === '/all_project'"
            class="all_project_container"
        >
            <!-- 展示课题的表格 -->
            <el-table
                :data="keyword ? filterAllProjectList : currentProjectList"
                stripe
                :height="650"
                style="width: 100%; user-select: none"
                @row-dblclick="showProjectDetail"
            >
                <el-table-column prop="name" label="题目名称" min-width="320">
                </el-table-column>
                <el-table-column prop="source" label="来源" min-width="140">
                </el-table-column>
                <el-table-column prop="demand" label="要求" min-width="300">
                </el-table-column>
                <el-table-column
                    prop="tutor"
                    label="导师"
                    min-width="130"
                    :sortable="true"
                    :sort-by="['tutor', 'name']"
                >
                </el-table-column>
                <el-table-column label="状态" min-width="130">
                    <template slot-scope="scope">
                        <span
                            :style="
                                scope.row.studentId
                                    ? { color: 'green' }
                                    : { color: 'red' }
                            "
                            >{{
                                scope.row.studentId ? "已被选" : "未被选"
                            }}</span
                        >
                    </template>
                </el-table-column>
                <!-- 学生登录时显示的部分 -->
                <el-table-column
                    min-width="200"
                    fixed="right"
                    align="right"
                    v-if="loginInformation.major"
                >
                    <template slot="header" slot-scope="scope">
                        <el-input
                            prefix-icon="el-icon-search"
                            v-model="keyword"
                            size="small"
                            placeholder="搜索题目或导师"
                            @input="handleSearch(scope._self.keyword)"
                        />
                    </template>
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            icon="el-icon-check"
                            size="mini"
                            :disabled="
                                isMeHaveChoosen
                                    ? true
                                    : scope.row.studentId
                                    ? true
                                    : false
                            "
                            @click.native.prevent="chooseProject(scope.row)"
                        >
                            选择
                        </el-button>
                        <el-button
                            type="primary"
                            icon="el-icon-reading"
                            size="mini"
                            @click.native.prevent="goToDetail(scope.row)"
                        >
                            查看详情
                        </el-button>
                    </template>
                </el-table-column>
                <!-- 导师登录时显示的部分 -->
                <el-table-column
                    min-width="130"
                    fixed="right"
                    align="right"
                    v-else
                >
                    <template slot="header" slot-scope="scope">
                        <el-input
                            prefix-icon="el-icon-search"
                            v-model="keyword"
                            size="small"
                            placeholder="搜索题目或导师"
                            @input="handleSearch(scope._self.keyword)"
                        />
                    </template>
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            icon="el-icon-reading"
                            size="mini"
                            @click.native.prevent="goToDetail(scope.row)"
                        >
                            查看详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 未过滤的分页 -->
            <div class="pagination_wrap" v-show="keyword ? false : true">
                <el-pagination
                    layout="prev, pager, next,total"
                    :total="totalNum"
                    :pager-count="5"
                    :page-size="10"
                    @current-change="handleCurrentChange"
                >
                </el-pagination>
            </div>
            <!-- 过滤后的分页 -->
            <div class="pagination_wrap" v-show="keyword">
                <el-pagination
                    layout="prev, pager, next,total"
                    :total="filtersTotalNum"
                    :pager-count="5"
                    :page-size="10"
                    @current-change="handleFilterCurrentChange"
                >
                </el-pagination>
            </div>

            <!-- 课题详情的弹出消息框 -->
            <el-dialog
                :visible.sync="dialogVisible"
                width="1000px"
                center
                top="30vh"
                title="课题详情"
            >
                <!-- 课题详情的描述列表 -->
                <el-descriptions :title="description.name" :column="3">
                    <el-descriptions-item label="课题ID">
                        {{ description.id }}
                    </el-descriptions-item>
                    <el-descriptions-item label="名称">
                        {{ description.name }}
                    </el-descriptions-item>
                    <el-descriptions-item label="内容">
                        {{ description.content }}
                    </el-descriptions-item>
                    <el-descriptions-item label="学生学号">
                        <span
                            :style="
                                description.studentId
                                    ? { color: 'green' }
                                    : { color: 'red' }
                            "
                        >
                            {{
                                description.studentId
                                    ? description.studentId
                                    : "未被选"
                            }}
                        </span>
                    </el-descriptions-item>
                    <el-descriptions-item label="所属导师">
                        {{ description.tutor }}
                    </el-descriptions-item>
                    <el-descriptions-item label="性质">
                        {{ description.nature }}
                    </el-descriptions-item>
                    <el-descriptions-item label="来源">
                        {{ description.source }}
                    </el-descriptions-item>
                    <el-descriptions-item label="要求">
                        {{ description.demand }}
                    </el-descriptions-item>
                </el-descriptions>
            </el-dialog>
        </div>
        <div v-if="$route.name == 'projectDetail'">
            <!-- 显示子路由：课题详情 -->
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import {
        getAllProject,
        getAllProjectOfTutor,
        studentChooseProject,
    } from "@/api/api";
    export default {
        name: "AllProject",
        data() {
            return {
                // 表格的全部数据
                allProjectList: [],
                // 搜索过滤后的表格数据
                filterAllProjectList: [],
                // 当前页展示的表格数据
                currentProjectList: [],
                // 描述列表的数据
                description: {},
                // 搜索的关键字
                keyword: "",
                // 消息弹框是否可见
                dialogVisible: false,

                // 总条数
                totalNum: 0,
                // 总页数
                totalPage: 0,
                // 当前显示的页数
                currentPage: 1,

                // 搜索过滤后总条数
                filtersTotalNum: 0,
                // 搜索过滤后总页数
                filtersTotalPage: 0,
                // 搜索过滤后当前显示的页数
                filtersCurrentPage: 1,

                // 我是否选择了课题
                isMeHaveChoosen: false,

                // 登录信息
                loginInformation: {},
            };
        },
        methods: {
            // 获取全部课题信息
            async getAllProjectList() {
                let data = await getAllProject();

                this.totalNum = data.length;
                this.totalPage = Math.ceil(data.length / 10);
                this.allProjectList = [...data];

                // 获取所有课题对应的导师的信息
                getAllProjectOfTutor().then((data) => {
                    this.allProjectList.map((item, index) => {
                        // 设置响应式的数据
                        this.$set(item, "tutor", data[index]);
                    });
                });

                // 调用方法, 默认显示第一页的数据
                this.getCurrentPageProjectList();

                // 如果是学生登录
                if (this.loginInformation.major) {
                    // 遍历所有的课题列表，如果有课题列表的 studentId 等于我的 id，则表示我已经选择了课题
                    this.isMeHaveChoosen = this.allProjectList.some((item) => {
                        return item.studentId == this.loginInformation.sno;
                    });
                }
            },

            // 双击弹出详情的 dialog
            showProjectDetail(row) {
                // 调整消息弹框可见
                this.dialogVisible = true;
                // 将行的数据存入 description
                this.description = row;
            },

            // 跳转详情页
            goToDetail(project) {
                this.$router.push({
                    name: "projectDetail",
                    params: project,
                });
            },

            // 点击选择按钮
            chooseProject(row) {
                const { id } = row; // 课题ID
                const { sno: studentId } = this.loginInformation; // 学生ID
                this.$confirm("确定选择该课题吗？", "课题选择", {
                    type: "success",
                })
                    .then(() => {
                        studentChooseProject({ id, studentId })
                            .then((data) => {
                                if (data) {
                                    this.$notify({
                                        type: "success",
                                        message: "选题成功",
                                    });
                                    this.getAllProjectList();
                                    this.$bus.$emit("myProjectHasChanged");
                                }
                            })
                            .catch(() => {
                                this.$notify({
                                    type: "error",
                                    title: "选题失败",
                                });
                            });
                    })
                    .catch(() => {});
            },

            // 处理搜索
            handleSearch(keyword) {
                this.filterAllProjectList = [];

                // 如果搜索关键词不为空
                if (keyword.trim() !== "") {
                    let tempFilterList = this.allProjectList.filter((project) => {
                        const { name, tutor } = project;
                        // String 的 includes 方法是区分大小写的, 所以要调整下大小写
                        // 返回【课题名称】或【课题导师名字】中包含搜索关键字的课题
                        return (
                            name.toLowerCase().includes(keyword.toLowerCase()) ||
                            tutor.toLowerCase().includes(keyword.toLowerCase())
                        );
                    });

                    // 过滤后的表格分页
                    this.filtersTotalNum = tempFilterList.length;
                    this.filtersTotalPage = Math.ceil(tempFilterList.length / 10);

                    const {
                        filtersTotalNum,
                        filtersTotalPage,
                        filtersCurrentPage,
                    } = this;

                    if (filtersCurrentPage < filtersTotalPage) {
                        for (let i = 0; i <= 9; i++) {
                            this.filterAllProjectList.push(
                                tempFilterList[(filtersCurrentPage - 1) * 10 + i]
                            );
                        }
                    } else if (filtersCurrentPage === filtersTotalPage) {
                        let temp = 10 - (filtersTotalPage * 10 - filtersTotalNum);
                        for (let i = 0; i < temp; i++) {
                            this.filterAllProjectList.push(
                                tempFilterList[(filtersCurrentPage - 1) * 10 + i]
                            );
                        }
                    }
                }
            },

            // 当前显示第几页，则在 currrentProjectList 存入相应的数据
            getCurrentPageProjectList() {
                this.currentProjectList = [];
                const { totalPage, currentPage, totalNum } = this;
                // 组织数据填充到当前要显示的第几页的数组中
                if (currentPage < totalPage) {
                    for (let i = 0; i <= 9; i++) {
                        this.currentProjectList.push(
                            this.allProjectList[(currentPage - 1) * 10 + i]
                        );
                    }
                } else if (currentPage === totalPage) {
                    let temp = 10 - (totalPage * 10 - totalNum);
                    for (let i = 0; i < temp; i++) {
                        this.currentProjectList.push(
                            this.allProjectList[(currentPage - 1) * 10 + i]
                        );
                    }
                }
            },

            // 处理点击第几页
            handleCurrentChange(clickPage) {
                this.currentPage = clickPage;
                this.getCurrentPageProjectList();
            },

            // 处理搜索过滤后点击第几页
            handleFilterCurrentChange(clickPage) {
                this.filtersCurrentPage = clickPage;
                this.handleSearch(this.keyword);
            },
        },
        beforeMount() {
            // 获取全部课题信息
            this.getAllProjectList();
            // 在全局事件总线上绑定事件(当课题信息修改与添加时, 重新发请求, 更新列表)
            this.$bus.$on("projectHasChanged", () => {
                this.getAllProjectList();
            });
            // 往 data 里存储登录信息
            this.loginInformation = JSON.parse(
                localStorage.getItem("loginInformation")
            );
        },
        beforeDestroy() {
            this.$bus.$off("projectHasChanged");
        },
    };
</script>

<style lang="scss" scoped>
    .breadcrumb {
        margin-top: 20px;
        font-size: 14px;
        user-select: none;
        .breadcrumb_item {
            color: #409eff;
            cursor: pointer;
        }
    }
    .pagination_wrap {
        text-align: center;
        margin-top: 30px;
    }
</style>