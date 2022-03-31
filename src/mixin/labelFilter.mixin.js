export default {
    filters: {
        labelFilter(data, labelObj) {
            switch (data) {
                case "id": {
                    if (labelObj.major !== undefined) return "学号";
                    else if (labelObj.title !== undefined) return "工号";
                    else return "ID";
                }
                case "name":
                    return "姓名";
                case "password":
                    return "密码";
                case "tel":
                    return "手机号";
                case "gender":
                    return "性别";
                case "major":
                    return "专业";
                case "class_grade":
                    return "班级";
                case "qq":
                    return "QQ号";
                case "title":
                    return "职称";
                case "degree":
                    return "学位";
                case "isInsideSchool":
                    return "是否本校";
                case "introduction":
                    return "介绍";
            }
        },
    },
}