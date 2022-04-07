<template>
    <div class="header_wrap">
        <div class="school_badge_wrap">
            <a href="http://www.ndkj.com.cn/" target="_new">
                <img src="@/assets/校徽.png" />
            </a>
        </div>
        <div class="school_name_chinese">
            <a href="http://www.ndkj.com.cn/" target="_new">
                <img src="@/assets/南大中文.png" />
            </a>
        </div>
        <div class="school_name_english">
            <a href="http://www.ndkj.com.cn/" target="_new">
                <img src="@/assets/南大英文.png" />
            </a>
        </div>
        <h1>毕业设计(论文)互动平台</h1>
        <div class="login_name" v-if="isLogin">
            欢迎你，<i>{{ loginInformation.name }}</i>
        </div>
        <el-button type="danger" @click="logout" v-if="isLogin">
            退出登录
        </el-button>
    </div>
</template>

<script>
    export default {
        name: "MyHeader",
        props: ["isLogin", "loginInformation"],
        methods: {
            logout() {
                this.$emit("logout");
            },
        },
    };
</script>

<style lang="scss">
    .header_wrap {
        width: 1200px;
        height: 120px;
        margin: 0 auto;
        margin-bottom: 5px;
        position: relative;
        border-bottom: 3px solid #a03f4d;
        .school_badge_wrap {
            position: absolute;
            left: 10px;
            top: 16px;
            img {
                width: 92px;
            }
        }
        .school_name_chinese {
            position: absolute;
            left: 120px;
            img {
                width: 80%;
            }
        }
        .school_name_english {
            position: absolute;
            left: 140px;
            bottom: 0px;
            img {
                width: 200px;
            }
        }
        h1 {
            position: absolute;
            top: 30px;
            right: 30px;
            font-size: 40px;
            color: #606266;
        }
        .login_name {
            position: absolute;
            top: 90px;
            right: 100px;
            height: 30px;
            i {
                color: #409eff;
                font-weight: bolder;
            }
        }
        button {
            position: absolute;
            top: 85px;
            right: 0;
            width: 80px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>