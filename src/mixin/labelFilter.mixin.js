export default {
    filters: {
        labelFilter(data, index) {
            switch (data) {
                case "id":
                    return "ID";
                case "sno":
                    return "学号";
                case "tno":
                    return "工号";
                case "ano":
                    return "工号";
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
                case "opportunity":
                    return "重选次数";
                case "qq":
                    return "QQ号";
                case "title":
                    if (index === 7) {
                        return "职称";
                    } else {
                        return "标题";
                    }
                case "degree":
                    return "学位";
                case "isInsideSchool":
                    return "是否本校";
                case "introduction":
                    return "介绍";
                case "content":
                    return "内容";
                case "url":
                    return "链接";
            }
        },
    },
}