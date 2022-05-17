<template>
    <el-table
        :data="dataList"
        :height="height"
        tooltip-effect="light"
        class="commonTable"
        @row-dblclick="showDetail"
    >
        <slot v-for="(item, index) in headers" :name="item">
            <el-table-column
                :sortable="item === 'id' ? true : false"
                :key="item"
                :prop="item"
                :width="item | columnWidthFilter(index)"
                :min-width="item | columnMinWidthFilter(index)"
                :label="item | labelFilter(index)"
                :show-overflow-tooltip="true"
            >
            </el-table-column>
        </slot>
        <slot name="operateArea"></slot>
    </el-table>
</template>

<script>
    import labelFilterMixin from "@/mixin/labelFilter.mixin";
    import columnWidthMixin from "@/mixin/columnWidthFilter.mixin";
    export default {
        name: "CommonTable",
        mixins: [labelFilterMixin, columnWidthMixin],
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

<style lang="scss">
    .commonTable {
        width: 100%;
        user-select: none;
    }
    // .el-table__fixed-body-wrapper {
    //     top: 65px !important;
    // }
</style>