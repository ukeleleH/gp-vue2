export default {
    filters: {
        columnWidthFilter(data, index) {
            switch (data) {
                case "id":
                    return "70px";
                case "sno":
                    return "120px";
                case "tno":
                    return "120px";
                case "ano":
                    return "120px";
                case "name":
                    if (index === 3) {
                        return "140px";   // 学生和导师管理表格的名字字段列宽
                    } else {
                        return "0px"
                    }
                case "tel":
                    return "150px";
                case "gender":
                    return "100px";
                case "major":
                    return "200px";
                case "qq":
                    return "150px";
            }
        },
        columnMinWidthFilter(data, index) {
            switch (data) {
                case "title":
                    if (index === 7) {
                        return "100px";
                    } else {
                        return "175px";
                    }
                case "degree":
                    return "100px";
                case "introduction":
                    return "100px";
                case "class_grade":
                    return "175rpx";
                case "opportunity":
                    return "175px";
                case "content":
                    return "300px";
                case "url":
                    return "175px";
                case "name": {
                    if (index === 1) {
                        return "250px";    // 专业表格的名称字段列宽
                    }
                }
                case "type":
                    return "250px"
            }
        }
    }
}