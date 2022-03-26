<template>
    <div class="aside_left_notice" v-if="leftNoticeData.length != 0">
        <h3>公&nbsp;告</h3>
        <main>
            <ul v-for="item in leftNoticeData" :key="item.id">
                <li>
                    <a :href="item.url" :title="item.title">{{ item.title }}</a>
                </li>
            </ul>
        </main>
    </div>
</template>

<script>
    import { requireLeftNotice } from "../../api/api";
    export default {
        name: "LeftNotice",
        data() {
            return {
                leftNoticeData: [],
            };
        },
        mounted() {
            // 查询 localStorage 中是否存储了登录信息
            const isLogin = localStorage.getItem("isLogin");
            if (!isLogin) {
                // 如果未登录
                // 获取公告数据
                requireLeftNotice().then((res) => {
                    this.leftNoticeData = [...res, ...this.leftNoticeData];
                });
            }
        },
    };
</script>

<style lang="scss" scoped>
    .aside_left_notice {
        width: 200px;
        height: 500px;
        overflow: hidden;
        h3 {
            text-align: center;
            line-height: 40px;
            height: 50px;
            font-size: 20px;
            color: #143270;
            background: linear-gradient(
                rgb(160, 63, 77),
                rgba(255, 255, 255, 1) 80%
            );
        }
        main {
            margin-top: 5px;
            background: linear-gradient(
                rgba(255, 255, 255, 1) 80%,
                rgb(160, 63, 77) 100%
            );
            border-top: 1px solid #a03f4d;
            ul {
                padding: 8px;
                border-left: 1px solid #a03f4d;
                border-right: 1px solid #a03f4d;
                box-sizing: border-box;
                li {
                    list-style-type: none;
                    width: 100%;
                    height: 40px;
                    font-size: 14px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    a {
                        color: #143270;
                        text-decoration: none;
                    }
                    a:hover {
                        color: blue;
                    }
                    a:visisted {
                        color: #143270;
                    }
                }
            }
        }
    }
</style>