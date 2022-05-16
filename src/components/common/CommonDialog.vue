<template>
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        :before-close="cancelHandler"
    >
        <el-form :model="form" :rules="rules" ref="commonForm">
            <slot v-for="item in labels">
                <el-form-item
                    :key="item"
                    :label="item | labelFilter"
                    :prop="item"
                >
                    <el-input v-model="form[item]"></el-input>
                </el-form-item>
            </slot>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="resetHandler">重置</el-button>
            <el-button type="primary" @click="submitHandler">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "CommonDialog",
        props: {
            dialogVisible: {
                required: true,
                type: Boolean,
            },
            title: {
                required: true,
                type: String,
            },
            form: {
                required: true,
                type: Object,
            },
            rules: {
                required: true,
                type: Object,
            },
            labels: {
                required: true,
                type: Array,
            },
        },
        filters: {
            labelFilter(data) {
                switch (data) {
                    case "title":
                        return "标题";
                    case "content":
                        return "内容";
                    case "url":
                        return "链接";
                }
            },
        },
        methods: {
            cancelHandler() {
                // 触发父组件的方法
                this.$emit("closeDialog");
            },
            resetHandler() {
                if (this.title === "修改公告") {
                    this.$emit("resetDialog", this.$refs);
                } else {
                    this.$refs.commonForm.resetFields();
                }
            },
            submitHandler() {
                // 表单校验
                this.$refs.commonForm.validate((valid) => {
                    if (valid) {
                        // 触发父组件的方法
                        this.$emit("submitDialog");
                    }
                });
            },
        },
    };
</script>

<style>
</style>