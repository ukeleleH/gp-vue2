import { systemSearchDepartment, systemSearchMajor, systemSearchClass } from "@/api/api"
export default {
    methods: {
        // 查询学科部数据
        async getDepartment() {
            let data = await systemSearchDepartment();
            this.getMajor(data)
        },

        // 查询专业数据
        async getMajor(department) {
            let data = await systemSearchMajor();
            // 组织专业的数组数据
            let majorArr = []
            department.forEach((item, index) => {
                let temArr = []
                data.forEach(major => {
                    if (item.id == major.d_id) {
                        delete major.d_id
                        if (this.$route.path === "/profile") {
                            major.disabled = true
                        }
                        temArr.push(major)
                    }
                })
                majorArr[index] = temArr
            })

            // 组织专业被选中的值
            majorArr.forEach((innerArr, index) => {
                innerArr.forEach(async item => {
                    // 如果是学生个人信息页
                    if (item.name === this.$route.query.major) {
                        this.majorCascaderVal = [index + 1, item.id]
                        this.rawMajorCascaderVal = [index + 1, item.id]
                        // 发生请求，获取班级数据
                        let data = await systemSearchClass(item.type)
                        this.classArr = data
                    }
                    if (this.currentRowObj) {
                        // 如果是管理员的学生管理页
                        if (item.name === this.currentRowObj.major) {
                            this.majorCascaderVal = [index + 1, item.id]
                            this.rawMajorCascaderVal = [index + 1, item.id]
                            // 发生请求，获取班级数据
                            let data = await systemSearchClass(item.type)
                            this.classArr = data
                        }
                    }
                })
            })

            // 组织专业的级联数据
            let tempMajorOptions = department.map((item, index) => {
                item.children = majorArr[index]
                return item
            })
            let str1 = JSON.stringify(tempMajorOptions).replace(/id/g, "value");
            let str2 = str1.replace(/name/g, "label");
            this.majorOptions = JSON.parse(str2)
        },

        // 专业选择改变的方法
        majorChangeHandler(val) {
            this.majorOptions.forEach(item => {
                if (item.value == val[0]) {
                    item.children.forEach(async innerItem => {
                        if (innerItem.value == val[1]) {
                            // 如果是学生个人信息修改页
                            if (this.$route.path === "/profile") {
                                this.studentForm.major = innerItem.label
                                this.studentForm.class_grade = ""
                            }
                            // 如果是管理员的学生管理页
                            if (this.$route.path === "/student_manage") {
                                // 如果是修改学生信息
                                if (this.isDescShow) {
                                    this.currentRowObj.major = innerItem.label
                                    this.currentRowObj.class_grade = ""
                                }
                                // 如果是新增学生信息
                                if (this.isFormShow) {
                                    this.studentForm.major = innerItem.label
                                    this.studentForm.class_grade = ""
                                }
                            }
                            // 发生请求，获取班级数据
                            let data = await systemSearchClass(innerItem.type)
                            this.classArr = data
                        }
                    })
                }
            })
        }
    }
}