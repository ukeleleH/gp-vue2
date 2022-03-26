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
    export default {
        name: "DocumentTranslation",
        data() {
            return {
                foreignLanguage: "",
                chinese: "",
            };
        },
        methods: {},
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