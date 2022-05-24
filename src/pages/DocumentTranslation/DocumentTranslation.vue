<template>
    <div class="document_translation_wrap">
        <div style="position: absolute; top: 0px; font-size: 12px; color: #888">
            无需手动上传，当处于编辑时，原文和译文每隔5秒会自动保存并上传
            <span style="color: #f56c6c">{{ time }} </span>秒
        </div>
        <el-form :model="translationForm" :rules="rules">
            <el-col :span="10">
                <div class="title">外文原文</div>
                <el-form-item prop="english">
                    <el-input
                        type="textarea"
                        resize="none"
                        placeholder="英文原文"
                        :rows="26"
                        :disabled="isDisabled"
                        maxlength="2500"
                        show-word-limit
                        v-model="translationForm.english"
                    >
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" :offset="3">
                <div class="title">翻译译文</div>
                <el-form-item prop="chinese">
                    <el-input
                        type="textarea"
                        resize="none"
                        placeholder="翻译译文"
                        :rows="26"
                        :disabled="isDisabled"
                        maxlength="2500"
                        show-word-limit
                        v-model="translationForm.chinese"
                    >
                    </el-input>
                </el-form-item>
            </el-col>
        </el-form>
    </div>
</template>

<script>
    import { MessageBox } from "element-ui";
    import {
        getStudentProject,
        selectTutorTno,
        selectTranslationExist,
        uploadTranslation,
        updateTranslation,
        selectTranslation,
    } from "@/api/api";
    export default {
        name: "DocumentTranslation",
        data() {
            return {
                isFirstShow: true,
                isDisabled: true,
                // 计时
                time: 0,
                // 定时器
                timer: "",
                translationForm: {
                    sno: "",
                    tno: "",
                    english: "",
                    chinese: "",
                },
                rules: {
                    english: [
                        {
                            required: true,
                            message: "外文原文不能为空",
                            trigger: "blur",
                        },
                    ],
                    chinese: [
                        {
                            required: true,
                            message: "翻译译文不能为空",
                            trigger: "blur",
                        },
                    ],
                },
            };
        },
        watch: {
            "translationForm.english": function () {
                if (this.isFirstShow) {
                    this.isFirstShow = false;
                    return;
                }
                clearInterval(this.timer);
                this.time = 5;
                this.timer = setInterval(async () => {
                    this.time = this.time - 1;
                    if (this.time === 0) {
                        try {
                            // 更新文献翻译
                            let data = await updateTranslation(
                                this.translationForm
                            );
                            if (data) {
                                this.$message({
                                    message: "保存成功",
                                    center: true,
                                    type: "success",
                                });
                            }
                        } finally {
                            clearInterval(this.timer);
                        }
                    }
                }, 1000);
            },
            "translationForm.chinese": function () {
                if (this.isFirstShow) {
                    this.isFirstShow = false;
                    return;
                }
                clearInterval(this.timer);
                this.time = 5;
                this.timer = setInterval(async () => {
                    this.time = this.time - 1;
                    if (this.time === 0) {
                        try {
                            // 更新文献翻译
                            let data = await updateTranslation(
                                this.translationForm
                            );
                            if (data) {
                                this.$message({
                                    message: "保存成功",
                                    center: true,
                                    type: "success",
                                });
                            }
                        } finally {
                            clearInterval(this.timer);
                        }
                    }
                }, 1000);
            },
        },
        methods: {
            async getTutorTno(sno) {
                // 发送请求，获取导师学号
                let tno = await selectTutorTno(sno);
                this.translationForm.tno = tno;
                // 查询文献翻译是否存在
                this.isExistTranslation(sno);
            },

            async isExistTranslation(sno) {
                let exist = await selectTranslationExist(sno);
                if (!exist) {
                    // 如果不存在，插入该条记录
                    await uploadTranslation(this.translationForm);
                } else {
                    // 存在获取该条记录
                    let data = await selectTranslation(sno);
                    if (data.english) {
                        this.translationForm.english = data.english;
                    }
                    if (data.chinese0) {
                        this.translationForm.chinese = data.chinese;
                    }
                }
            },
        },
        async mounted() {
            // 注册事件
            this.$bus.$on("canEditTranslation", () => {
                this.isDisabled = false;
            });
            this.$bus.$on("cantEditTranslation", () => {
                this.isDisabled = true;
            });
            const sno = JSON.parse(localStorage.getItem("loginInformation")).sno;
            this.translationForm.sno = sno;
            // 先查询学生是否已经选择课题
            let data = await getStudentProject(sno);
            if (data) {
                this.isDisabled = false;
                this.getTutorTno(sno);
            }
        },
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