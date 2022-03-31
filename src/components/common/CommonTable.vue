<template>
    <el-table
        :data="dataList"
        :height="height"
        class="commonTable"
        @row-dblclick="showDetail"
    >
        <slot v-for="item in headers" :name="item">
            <el-table-column
                :sortable="item === 'id' ? true : false"
                :key="item"
                :prop="item"
                :label="item | labelFilter(dataList[0])"
            >
            </el-table-column>
        </slot>
        <slot name="operateArea"></slot>
    </el-table>
</template>

<script>
    import labelFilterMixin from "../../mixin/labelFilter.mixin";
    export default {
        name: "CommonTable",
        mixins: [labelFilterMixin],
        props: {
            height: {
                type: Number,
                required: true,
            },
            headers: {
                type: Array,
                required: true,
            },
            dataList: {
                type: Array,
                required: true,
            },
            showDetail: {
                type: Function,
                required: true,
            },
        },
    };
</script>

<style lang="scss" scoped>
    .commonTable {
        width: 100%;
        user-select: none;
    }
</style>