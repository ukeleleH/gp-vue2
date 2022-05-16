export default {
    filters: {
        columnWidthFilter(data) {
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
                    return "140px";
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
            }
        }
    }
}