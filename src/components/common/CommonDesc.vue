<template>
    <div class="commonDesc">
        <el-descriptions :column="3" border>
            <template slot="extra">
                <el-button type="primary" size="small" @click="pullUp">
                    收起
                </el-button>
            </template>
            <el-descriptions-item
                v-for="item in labels"
                :key="item"
                :label="item | labelFilter(descObj)"
            >
                <slot :name="item" :descObj="descObj">
                    <el-input
                        v-model="descObj[item]"
                        :disabled="item === 'password' ? true : false"
                    ></el-input>
                </slot>
            </el-descriptions-item>
        </el-descriptions>
        <div class="btn_container">
            <el-button type="success" plain size="small" @click="confirmChange">
                确认修改
            </el-button>
            <el-button type="warning" plain size="small" @click="cancelChange">
                重置
            </el-button>
        </div>
    </div>
</template>

<script>
    import labelFilterMixin from "@/mixin/labelFilter.mixin";
    export default {
        name: "CommonDesc",
        mixins: [labelFilterMixin],
        props: {
            labels: {
                type: Array,
                required: true,
            },
            descObj: {
                type: Object,
                required: true,
            },
            pullUp: {
                type: Function,
                required: true,
            },
            confirmChange: {
                type: Function,
                required: true,
            },
            cancelChange: {
                type: Function,
                required: true,
            },
        },
    };
</script>

<style lang="scss" scoped>
    .commonDesc {
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