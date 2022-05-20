<!-- 通用的导师批阅功能的组件 -->
<template>
    <div>
        <el-select v-model="checkedVal" placeholder="请选择学生">
            <el-option
                v-for="item in selectOptions"
                :key="item.sno"
                :value="item.sno"
                :label="item.name"
            >
            </el-option
        ></el-select>
        <el-table height="610" :data="tableDatas" stripe>
            <slot v-for="(item, index) of headers" :name="item">
                <el-table-column
                    :label="labels[index]"
                    :prop="item"
                    min-width="100%"
                ></el-table-column>
            </slot>
            <slot name="operate"></slot>
        </el-table>
        <el-dialog :visible.sync="dialogVisible" :before-close="handleClose">
            <el-form :model="form" :rules="formRules" ref="reviewForm">
                <slot v-for="(value, key, index) of form" :name="key">
                    <el-form-item :label="formLabels[index]" :prop="key">
                        <el-input v-model="form[key]"></el-input>
                    </el-form-item>
                </slot>
            </el-form>
            <div slot="footer">
                <el-button type="primary" @click="confirmSubmit">
                    确 定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "CommonReview",
        props: {
            selectOptions: {
                required: true,
                type: Array,
            },
            headers: {
                required: true,
                type: Array,
            },
            labels: {
                required: true,
                type: Array,
            },
            tableDatas: {
                required: true,
                type: Array,
            },
            dialogVisible: {
                require: true,
                type: Boolean,
            },
            form: {
                required: true,
                type: Object,
            },
            formLabels: {
                required: true,
                type: Array,
            },
            formRules: {
                required: true,
                type: Object,
            },
        },
        data() {
            return {
                checkedVal: "",
            };
        },
        watch: {
            checkedVal(newVal) {
                this.$emit("checkedValChange", newVal);
            },
        },
        methods: {
            handleClose() {
                this.$emit("closeDialog");
            },
            confirmSubmit() {
                this.$refs.reviewForm.validate((valid) => {
                    if (valid) {
                        this.$emit("sumbitDialog");
                    }
                });
            },
        },
    };
</script>

<style>
</style>