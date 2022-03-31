<template>
    <el-form
        :model="addForm"
        :rules="addRules"
        :ref="refName"
        class="commonForm"
    >
        <el-descriptions :column="3" border>
            <template slot="extra">
                <el-button type="primary" size="small" @click="pullUp">
                    收起
                </el-button>
            </template>
            <el-descriptions-item
                v-for="item of labels"
                :key="item"
                :label="item | labelFilter(addForm)"
            >
                <slot :name="item" :addForm="addForm">
                    <el-form-item :prop="item">
                        <el-input
                            v-model="addForm[item]"
                            :maxlength="item | itemLengthFilter"
                            show-word-limit
                        ></el-input>
                    </el-form-item>
                </slot>
            </el-descriptions-item>
        </el-descriptions>
        <div class="btn_container">
            <el-button
                type="success"
                plain
                size="small"
                @click="confirmAdd(refName, $refs)"
                >确认添加</el-button
            >
            <el-button
                type="warning"
                plain
                size="small"
                @click="cancelAdd(refName, $refs)"
                >重置</el-button
            >
        </div>
    </el-form>
</template>

<script>
    import labelFilterMixin from "../../mixin/labelFilter.mixin";
    import itemLengthFilter from "../../mixin/itemLengthFilter.mixin";
    export default {
        name: "CommonForm",
        mixins: [labelFilterMixin, itemLengthFilter],
        props: {
            labels: {
                type: Array,
                required: true,
            },
            addForm: {
                type: Object,
                required: true,
            },
            addRules: {
                type: Object,
                required: true,
            },
            refName: {
                type: String,
                required: true,
            },
            pullUp: {
                type: Function,
                required: true,
            },
            confirmAdd: {
                type: Function,
                required: true,
            },
            cancelAdd: {
                type: Function,
                required: true,
            },
        },
    };
</script>

<style lang="scss" scoped>
    .commonForm {
        margin-top: 50px;
    }
    .btn_container {
        width: 250px;
        margin: 0 auto;
        margin-top: 10px;
        display: flex;
        justify-content: space-around;
    }
</style>