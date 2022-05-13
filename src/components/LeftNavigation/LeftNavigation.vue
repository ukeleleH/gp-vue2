<template>
    <div class="left_navigation_wrap">
        <el-row>
            <el-col :span="3">
                <el-menu
                    mode="vertical"
                    text-color="#a03f4d"
                    class="whole_menu"
                    :default-active="activeIndex"
                    @select="handleSelect"
                >
                    <router-link
                        :to="{ path: '/profile', query }"
                        v-show="loginInformation.major"
                    >
                        <el-menu-item index="1">
                            <i class="el-icon-user-solid"></i>
                            <span>个人信息</span>
                        </el-menu-item>
                    </router-link>
                    <router-link
                        :to="{ path: '/profile', query }"
                        v-show="loginInformation.title"
                    >
                        <el-menu-item index="1">
                            <i class="el-icon-user-solid"></i>
                            <span>个人信息</span>
                        </el-menu-item>
                    </router-link>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-document"></i>
                            <span>查看选题</span>
                        </template>
                        <router-link to="/all_project">
                            <el-menu-item index="2-1">
                                本系全部选题
                            </el-menu-item>
                        </router-link>
                        <router-link
                            to="/my_project"
                            v-show="loginInformation.major"
                        >
                            <el-menu-item index="2-2"> 我的选题 </el-menu-item>
                        </router-link>
                        <router-link
                            to="/has_published_project"
                            v-show="loginInformation.title"
                        >
                            <el-menu-item index="2-2">
                                我发布的选题
                            </el-menu-item>
                        </router-link>
                    </el-submenu>
                    <el-submenu
                        index="3"
                        v-if="loginInformation.identity !== 3"
                    >
                        <template slot="title">
                            <i class="el-icon-date"></i>
                            <span>前期任务</span>
                        </template>
                        <router-link
                            to="/opening_report"
                            v-show="loginInformation.major"
                        >
                            <el-menu-item index="3-1">开题报告</el-menu-item>
                        </router-link>
                        <router-link
                            to="/document_translation"
                            v-show="loginInformation.major"
                        >
                            <el-menu-item index="3-2">文献翻译</el-menu-item>
                        </router-link>
                    </el-submenu>
                    <el-submenu
                        index="4"
                        v-if="loginInformation.identity !== 3"
                    >
                        <template slot="title">
                            <i class="el-icon-s-platform"></i>
                            <span>中期任务</span>
                        </template>
                        <router-link
                            to="/database_design"
                            v-show="loginInformation.major"
                        >
                            <el-menu-item index="4-1">数据库设计</el-menu-item>
                        </router-link>
                        <el-menu-item index="4-2">编码</el-menu-item>
                        <el-menu-item index="4-3">测试</el-menu-item>
                    </el-submenu>
                    <el-submenu
                        index="5"
                        v-if="loginInformation.identity !== 3"
                    >
                        <template slot="title">
                            <i class="el-icon-edit-outline"></i>
                            <span>后期任务</span>
                        </template>
                        <el-menu-item index="5-1">毕业论文初稿</el-menu-item>
                        <el-menu-item index="5-2">毕业论文定稿</el-menu-item>
                    </el-submenu>
                    <el-submenu
                        index="6"
                        v-if="loginInformation.identity === 3"
                    >
                        <template slot="title">
                            <i class="el-icon-files"></i>
                            <span>人员信息管理</span>
                        </template>
                        <router-link to="/student_manage">
                            <el-menu-item index="6-1">学生管理</el-menu-item>
                        </router-link>
                        <router-link to="/tutor_manage">
                            <el-menu-item index="6-2">导师管理</el-menu-item>
                        </router-link>
                    </el-submenu>
                    <el-submenu
                        index="7"
                        v-if="loginInformation.identity === 3"
                    >
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>其他管理</span>
                        </template>
                        <router-link to="/student_manage">
                            <el-menu-item index="7-1">公告管理</el-menu-item>
                        </router-link>
                        <router-link to="/tutor_manage">
                            <el-menu-item index="7-2">
                                专业、班级管理
                            </el-menu-item>
                        </router-link>
                    </el-submenu>
                </el-menu>
            </el-col>
            <el-col :span="19" :offset="1">
                <keep-alive :exclude="['Profile']">
                    <router-view> </router-view>
                </keep-alive>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "LeftNavigation",
        props: ["loginInformation"],
        data() {
            return {
                activeIndex: "1",
            };
        },
        computed: {
            // 路由跳转的 query 参数
            query() {
                if (this.loginInformation.major) {
                    // 学生身份
                    const { sno, name, major, class_grade, gender, tel } =
                        this.loginInformation;
                    return {
                        sno,
                        name,
                        major,
                        class_grade,
                        gender,
                        tel,
                    };
                } else if (this.loginInformation.title) {
                    // 导师身份
                    const {
                        tno,
                        name,
                        qq,
                        title,
                        gender,
                        degree,
                        tel,
                        isInsideSchool,
                        introduction,
                    } = this.loginInformation;
                    return {
                        tno,
                        name,
                        qq,
                        title,
                        gender,
                        degree,
                        tel,
                        isInsideSchool,
                        introduction,
                    };
                }
            },
        },
        methods: {
            handleSelect(key) {
                // 防止刷新后, 激活的索引丧失
                this.activeIndex = key;
                localStorage.setItem("activeIndex", key);
            },
        },
        watch: {
            // 监听路由地址的改变
            "$route.path": {
                handler: function (newVal) {
                    if (newVal === "/my_project") {
                        this.activeIndex = "2-2";
                        // 防止刷新后, 激活的索引丧失
                        localStorage.setItem("activeIndex", "2-2");
                    } else if (newVal === "/" || newVal === "/profile") {
                        this.activeIndex = "1";
                        // 防止刷新后, 激活的索引丧失
                        localStorage.setItem("activeIndex", "1");
                    }
                },
                immediate: true,
            },
            "$route.name": {
                handler: function (newVal) {
                    if (newVal === "projectDetail") {
                        this.activeIndex = "2-1";
                        // 防止刷新后, 激活的索引丧失
                        localStorage.setItem("activeIndex", "2-1");
                    }
                },
                immediate: true,
            },
            // 监听个人基本信息的改变
            loginInformation: {
                handler: function () {
                    this.$router.push({
                        path: "/profile?1&",
                        query: this.query,
                    });
                },
                deep: true,
            },
        },
        mounted() {
            // 获取索引
            this.activeIndex = localStorage.getItem("activeIndex");
            const { path } = this.$route;
            if (path === "/") {
                // 编程式路由导航
                setTimeout(() => {
                    this.$router.push({
                        path: "/profile",
                        query: this.query,
                    });
                }, 1000);
            }
        },
        beforeDestroy() {
            localStorage.removeItem("activeIndex");
        },
    };
</script>

<style lang="scss" scoped>
    .left_navigation_wrap {
        .whole_menu {
            width: 200px;
            height: 650px;
            user-select: none;
            font-weight: bold;
            margin-left: 5px;
        }
        a {
            text-decoration: none;
        }
    }
</style>