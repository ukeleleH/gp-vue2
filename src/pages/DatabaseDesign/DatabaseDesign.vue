<template>
    <div class="database_design_wrap" @click.self="handleInputKeyup">
        <div class="title">数据库设计</div>
        <el-tabs
            v-model="activeTabName"
            type="border-card"
            :editable="!canEdit"
            @edit="handleTabsEdit"
            style="user-select: none"
        >
            <el-tab-pane
                v-for="(item, index) in tabs"
                :key="item.name"
                :name="item.name"
                @click.native="canEdit = false"
            >
                <span slot="label" v-show="!canEdit" @dblclick="canEdit = true">
                    {{ item.label }}
                </span>
                <span slot="label" v-show="canEdit">
                    <input v-model="item.label" />
                </span>

                <el-button
                    type="primary"
                    style="margin-bottom: 20px"
                    @click="addRow"
                >
                    添加字段
                </el-button>

                <el-table :data="item.content" style="width: 100%" border>
                    <el-table-column label="字段名" min-width="130">
                        <template slot-scope="scope">
                            <el-input
                                v-model="scope.row.c_name.value"
                                v-show="scope.row.c_name.edit"
                                @keyup.native.enter="handleInputKeyup"
                            ></el-input>
                            <div
                                class="ceilDiv"
                                @dblclick="
                                    ceilDoubleClick(
                                        index,
                                        scope.$index,
                                        'c_name'
                                    )
                                "
                                v-show="!scope.row.c_name.edit"
                            >
                                {{ scope.row.c_name.value }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="字段类型" min-width="130">
                        <template slot-scope="scope">
                            <el-input
                                v-model="scope.row.c_type.value"
                                v-show="scope.row.c_type.edit"
                                @keyup.native.enter="handleInputKeyup"
                            ></el-input>
                            <div
                                class="ceilDiv"
                                @dblclick="
                                    ceilDoubleClick(
                                        index,
                                        scope.$index,
                                        'c_type'
                                    )
                                "
                                v-show="!scope.row.c_type.edit"
                            >
                                {{ scope.row.c_type.value }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column min-width="100" label="长度">
                        <template slot-scope="scope">
                            <el-input
                                v-model="scope.row.c_length.value"
                                v-show="scope.row.c_length.edit"
                                @keyup.native.enter="handleInputKeyup"
                            ></el-input>
                            <div
                                class="ceilDiv"
                                @dblclick="
                                    ceilDoubleClick(
                                        index,
                                        scope.$index,
                                        'c_length'
                                    )
                                "
                                v-show="!scope.row.c_length.edit"
                            >
                                {{ scope.row.c_length.value }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column min-width="100" label="小数点">
                        <template slot-scope="scope">
                            <el-input
                                v-model="scope.row.c_dot.value"
                                v-show="scope.row.c_dot.edit"
                                @keyup.native.enter="handleInputKeyup"
                            ></el-input>
                            <div
                                class="ceilDiv"
                                @dblclick="
                                    ceilDoubleClick(
                                        index,
                                        scope.$index,
                                        'c_dot'
                                    )
                                "
                                v-show="!scope.row.c_dot.edit"
                            >
                                {{ scope.row.c_dot.value }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column min-width="100" label="不为null">
                        <template slot-scope="scope">
                            <el-checkbox
                                v-model="scope.row.c_isNull.value"
                            ></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column min-width="100" label="自增长">
                        <template slot-scope="scope">
                            <el-checkbox
                                v-model="scope.row.c_auto_increase.value"
                            ></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column min-width="100" label="主键">
                        <template slot-scope="scope">
                            <el-checkbox
                                v-model="scope.row.c_key.value"
                            ></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column min-width="100" label="注释">
                        <template slot-scope="scope">
                            <el-input
                                v-model="scope.row.c_annotation.value"
                                v-show="scope.row.c_annotation.edit"
                                @keyup.native.enter="handleInputKeyup"
                            ></el-input>
                            <div
                                class="ceilDiv"
                                @dblclick="
                                    ceilDoubleClick(
                                        index,
                                        scope.$index,
                                        'c_annotation'
                                    )
                                "
                                v-show="!scope.row.c_annotation.edit"
                            >
                                {{ scope.row.c_annotation.value }}
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import { MessageBox } from "element-ui";
    export default {
        name: "DatabaseDesign",
        data() {
            return {
                // 表名是否可编辑
                canEdit: false,
                activeTabName: "1",
                tabIndex: 1,

                // 当前要编辑的字段所在的标签的索引
                index: 0,
                // 当前要编辑的字段所在的行的索引
                innerIndex: 0,
                // 当前要编辑的字段所在的列名
                columnName: "c_name",

                tabs: [
                    {
                        label: "表1",
                        name: "1",
                        content: [
                            {
                                c_name: { value: "", edit: false },
                                c_type: { value: "", edit: false },
                                c_length: { value: "", edit: false },
                                c_dot: { value: "", edit: false },
                                c_isNull: { value: false },
                                c_auto_increase: { value: false },
                                c_key: { value: false },
                                c_annotation: { value: "", edit: false },
                            },
                        ],
                    },
                ],
            };
        },
        methods: {
            ceilDoubleClick(index, innerIndex, columnName) {
                // 先调用一下 handleInputKeyup , 保证每次只有一个单元格处于可编辑
                this.handleInputKeyup();
                // 删除中间的标签时
                if (index > this.index && index > this.tabs.length - 1) {
                    // index -= 1;
                    index = this.tabs.length - 1;
                    this.innerIndex = innerIndex;
                    this.columnName = columnName;
                    this.tabs[index].content[innerIndex][columnName].edit = true;
                    return;
                }
                this.index = index;
                this.innerIndex = innerIndex;
                this.columnName = columnName;
                this.tabs[index].content[innerIndex][columnName].edit = true;
            },
            // enter 键弹起或者整个大的 div 被点击时
            handleInputKeyup() {
                let { index, innerIndex, columnName } = this;
                if (this.tabs.length) {
                    this.tabs[index].content[innerIndex][columnName].edit = false;
                }

                // 表名的可编辑状态
                this.canEdit = false;
            },
            // 新增标签或删除标签的方法
            handleTabsEdit(targetName, action) {
                // 新增标签页
                if (action === "add") {
                    // 先调用一下 handleInputKeyup , 保证每次只有一个单元格处于可编辑
                    this.handleInputKeyup();
                    let newTabName = ++this.tabIndex + "";
                    this.tabs.push({
                        label: "新表" + newTabName,
                        name: newTabName,
                        content: [
                            {
                                c_name: { value: "", edit: false },
                                c_type: { value: "", edit: false },
                                c_length: { value: "", edit: false },
                                c_dot: { value: "", edit: false },
                                c_isNull: { value: false },
                                c_auto_increase: { value: false },
                                c_key: { value: false },
                                c_annotation: { value: "", edit: false },
                            },
                        ],
                    });
                    this.activeTabName = newTabName;
                    // 外层循环索引
                    this.index++;
                }
                // 删除标签页
                if (action === "remove") {
                    let tabs = this.tabs;
                    let activeName = this.activeTabName;
                    if (activeName === targetName) {
                        tabs.forEach((tab, index) => {
                            if (tab.name === targetName) {
                                let nextTab = tabs[index + 1] || tabs[index - 1];
                                if (nextTab) {
                                    activeName = nextTab.name;
                                }
                            }
                        });
                    }

                    this.activeTabName = activeName;
                    this.tabs = tabs.filter((tab) => tab.name !== targetName);
                    // 外层循环索引
                    this.index--;
                }
            },
            addRow() {
                this.tabs[this.index].content.push({
                    c_name: { value: "", edit: false },
                    c_type: { value: "", edit: false },
                    c_length: { value: "", edit: false },
                    c_dot: { value: "", edit: false },
                    c_isNull: { value: false },
                    c_auto_increase: { value: false },
                    c_key: { value: false },
                    c_annotation: { value: "", edit: false },
                });
            },
        },
        mounted() {
            let tabs = localStorage.getItem("tabs");

            if (tabs) {
                this.tabs = JSON.parse(tabs);
                this.tabIndex = localStorage.getItem("tabIndex");
            }

            // setInterval(() => {
            //     let strTabs = JSON.stringify(this.tabs).replace("true", "false");
            //     localStorage.setItem("tabs", strTabs);
            //     localStorage.setItem("tabIndex", this.tabIndex);
            // }, 1000);
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
    .database_design_wrap {
        margin-top: 20px;
        height: 650px;
        .title {
            color: #303133;
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 20px;
        }
        .ceilDiv {
            width: 100%;
            height: 40px;
            display: flex;
            align-items: center;
        }
    }
</style>