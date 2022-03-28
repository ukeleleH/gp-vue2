<template>
    <div class="home_page">
        <!-- 头部组件 -->
        <MyHeader
            :isLogin="isLogin"
            :loginInformation="loginInformation"
            @logout="logout"
        >
        </MyHeader>
        <!-- 未登录时显示的部分 -->
        <template v-if="!isLogin">
            <div class="home_main">
                <!-- 左侧公告 -->
                <LeftNotice v-if="!isLogin"></LeftNotice>
                <!-- 主体包裹的容器 -->
                <MyMainLogin @login="login"></MyMainLogin>
            </div>
        </template>
        <!-- 登录时显示的部分 -->
        <template v-else>
            <LeftNavigation
                :loginInformation="loginInformation"
            ></LeftNavigation>
        </template>
    </div>
</template>

<script>
    import MyHeader from "./components/MyHeader/MyHeader.vue";
    import MyMainLogin from "./components/MyMainLogin/MyMainLogin.vue";
    import LeftNotice from "./components/LeftNotice/LeftNotice.vue";
    import LeftNavigation from "./components/LeftNavigation/LeftNavigation.vue";
    export default {
        name: "App",
        data() {
            return {
                // 判断是否登录的标志
                isLogin: false,
                loginInformation: {},
            };
        },
        methods: {
            // 登录
            login(data) {
                const { isLogin } = data;
                this.isLogin = isLogin;
                this.loginInformation = data;
                // 往 localStorage 域中存储登录标志和登录信息
                localStorage.setItem("isLogin", isLogin);
                localStorage.setItem("loginInformation", JSON.stringify(data));
            },
            // 退出登录
            logout() {
                // 删除登录标志和登录信息
                localStorage.removeItem("isLogin");
                localStorage.removeItem("loginInformation");
                // data里的数据置空
                this.isLogin = "";
                this.loginInformation = {};
                // 路由地址切换
                this.$router.replace("/");
            },
        },
        components: {
            MyHeader,
            MyMainLogin,
            LeftNotice,
            LeftNavigation,
        },
        mounted() {
            // 在全局事件总线上绑定事件
            this.$bus.$on("passwordHasChanged", () => {
                this.logout();
            });
            // 查询 localStorage 中是否存储了登录信息
            const isLogin = localStorage.getItem("isLogin");
            const loginInformation = localStorage.getItem("loginInformation");
            this.isLogin = isLogin;
            this.loginInformation = JSON.parse(loginInformation);
        },
    };
</script>

<style lang="scss" scoped>
    .home_page {
        position: relative;
        margin-top: 3px;
        .home_main {
            width: 1310px;
            display: flex;
            justify-content: space-around;
            margin: 0 auto;
        }
    }
</style>