<template>
    <div class="left_navigation_wrap">
        <el-row>
            <el-col :span="4">
                <el-menu
                    mode="vertical"
                    text-color="#a03f4d"
                    style="width: 200px; user-select: none"
                    :default-active="activeIndex"
                    @select="handleSelect"
                >
                    <router-link
                        :to="{
                            path: '/profile',
                            query: {
                                id: loginInformation.id,
                                name: loginInformation.name,
                                major: loginInformation.major,
                                class_grade: loginInformation.class_grade,
                                gender: loginInformation.gender,
                                tel: loginInformation.tel,
                            },
                        }"
                        v-show="loginInformation.major"
                    >
                        <el-menu-item index="1">
                            <i class="el-icon-user-solid"></i>
                            <span>个人信息</span>
                        </el-menu-item>
                    </router-link>
                    <router-link
                        :to="{
                            path: '/profile',
                            query: {
                                id: loginInformation.id,
                                name: loginInformation.name,
                                qq: loginInformation.qq,
                                title: loginInformation.title,
                                gender: loginInformation.gender,
                                degree: loginInformation.degree,
                                tel: loginInformation.tel,
                                isInsideSchool: loginInformation.isInsideSchool,
                                introduction: loginInformation.introduction,
                            },
                        }"
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
                    <el-submenu index="3">
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
                    <el-submenu index="4">
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
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-edit-outline"></i>
                            <span>后期任务</span>
                        </template>
                        <el-menu-item index="5-1">毕业论文初稿</el-menu-item>
                        <el-menu-item index="5-2">毕业论文定稿</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
            <el-col :span="18">
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
        methods: {
            handleSelect(key) {
                // 防止刷新后, 激活的索引丧失
                this.activeIndex = key;
                localStorage.setItem("activeIndex", key);
            },
        },
        watch: {
            // 监视路由地址的改变
            "$route.path": {
                handler: function (newVal) {
                    if (newVal === "/my_project") {
                        this.activeIndex = "2-2";
                        // 防止刷新后, 激活的索引丧失
                        localStorage.setItem("activeIndex", "2-2");
                    } else if (newVal === "/") {
                        this.activeIndex = "1";
                        // 防止刷新后, 激活的索引丧失
                        localStorage.setItem("activeIndex", "1");
                    }
                },
                immediate: true,
            },
        },
        mounted() {
            // 获取索引
            this.activeIndex = localStorage.getItem("activeIndex");
            const { identity } = this.loginInformation;
            const { path } = this.$route;
            // 判断身份
            if (identity === "student" && path === "/") {
                // 解构赋值
                const { id, name, major, class_grade, gender, tel } =
                    this.loginInformation;
                // 编程式路由导航
                setTimeout(() => {
                    this.$router.push({
                        path: "/profile",
                        query: {
                            id,
                            name,
                            major,
                            class_grade,
                            gender,
                            tel,
                        },
                    });
                }, 1000);
            } else if (identity === "tutor" && path === "/") {
                // 解构赋值
                const {
                    id,
                    name,
                    qq,
                    title,
                    gender,
                    degree,
                    tel,
                    isInsideSchool,
                    introduction,
                } = this.loginInformation;
                // 编程式路由导航
                setTimeout(() => {
                    this.$router.push({
                        path: "/profile",
                        query: {
                            id,
                            name,
                            qq,
                            title,
                            gender,
                            degree,
                            tel,
                            isInsideSchool,
                            introduction,
                        },
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
        a {
            text-decoration: none;
        }
    }
</style>