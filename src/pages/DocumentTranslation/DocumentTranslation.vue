<template>
    <div class="document_translation_wrap">
        <el-col :span="10">
            <div class="title">外文原文</div>
            <el-input
                type="textarea"
                resize="none"
                placeholder="英文原文"
                :rows="26"
                maxlength="2500"
                show-word-limit
                v-model="foreignLanguage"
            >
            </el-input>
        </el-col>
        <el-col :span="10" :offset="2">
            <div class="title">翻译译文</div>
            <el-input
                type="textarea"
                resize="none"
                placeholder="翻译译文"
                :rows="26"
                maxlength="2500"
                show-word-limit
                v-model="chinese"
            >
            </el-input>
        </el-col>
    </div>
</template>

<script>
    import { MessageBox } from "element-ui";
    export default {
        name: "DocumentTranslation",
        data() {
            return {
                foreignLanguage: "",
                chinese: "",
            };
        },
        methods: {},
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
    .document_translation_wrap {
        margin-top: 20px;
        .title {
            color: #303133;
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 20px;
        }
    }
</style>