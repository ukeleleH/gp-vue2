<template>
    <el-row>
        <el-col :span="spanValue" :offset="offsetValue">
            <div class="header_wrap">
                <div class="school_badge_wrap">
                    <a href="http://www.ndkj.com.cn/" target="_new">
                        <img src="@/assets/校徽removebg.png" />
                    </a>
                </div>
                <div class="school_name_chinese">
                    <a href="http://www.ndkj.com.cn/" target="_new">
                        <img src="@/assets/南大中文removebg.png" />
                    </a>
                </div>
                <div class="school_name_english">
                    <a href="http://www.ndkj.com.cn/" target="_new">
                        <img src="@/assets/南大英文removebg.png" />
                    </a>
                </div>
                <h1>毕业设计(论文)互动平台</h1>
                <div class="login_name" v-if="isLogin">
                    欢迎你,&nbsp;
                    <i @click="goProfile" :class="{ current: current }">
                        {{ loginInformation.name }}
                    </i>
                    <span>&nbsp;&nbsp;({{ identity }})</span>
                </div>
                <el-button
                    size="mini"
                    type="danger"
                    @click="logout"
                    v-if="isLogin"
                >
                    退出登录
                </el-button>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "MyHeader",
        props: ["isLogin", "loginInformation"],
        computed: {
            identity() {
                if (this.loginInformation.identity === 1) return "学生";
                if (this.loginInformation.identity === 2) return "导师";
                if (this.loginInformation.identity === 3) return "管理员";
            },
            // 通过计算属性，动态地给名字是否加上 :hover 的样式
            current() {
                if (this.loginInformation.identity === 1) return true;
                if (this.loginInformation.identity === 2) return true;
                if (this.loginInformation.identity === 3) return false;
            },
            spanValue() {
                if (this.isLogin) return 19;
                else return 24;
            },
            offsetValue() {
                if (this.isLogin) return 4;
                else return 0;
            },
        },
        methods: {
            goProfile() {
                const { identity } = this.loginInformation;
                const { id, name } = this.loginInformation;
                if (identity === 1) {
                    // 学生身份
                    const { major, class_grade, gender, tel } =
                        this.loginInformation;
                    this.$router.push(
                        `/profile?id=${id}&name=${name}&major=${major}&class_grade=${class_grade}&gender=${gender}&tel=${tel}`
                    );
                } else if (identity === 2) {
                    // 导师身份
                    const { title, degree, gender, tel, qq } =
                        this.loginInformation;
                    const { introduction, isInsideSchool } = this.loginInformation;
                    this.$router.push(
                        `/profile?id=${id}&name=${name}&title=${title}&degree=${degree}&gender=${gender}&tel=${tel}&qq=${qq}&introduction=${introduction}&isInsideSchool=${isInsideSchool}`
                    );
                }
            },
            logout() {
                this.$emit("logout");
            },
        },
    };
</script>

<style lang="scss" scoped>
    .header_wrap {
        width: 1200px;
        height: 120px;
        margin: 0 auto;
        margin-bottom: 5px;
        position: relative;
        border-bottom: 3px solid #a03f4d;
        user-select: none;
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
                &.current:hover {
                    text-decoration: underline solid 2px;
                    cursor: pointer;
                }
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