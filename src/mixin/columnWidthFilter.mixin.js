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
                    return "180px";
                case "gender":
                    return "100px";
                case "major":
                    return "220px";
                case "class_grade":
                    return "200px";
                case "opportunity":
                    return "180px";
                case "qq":
                    return "120px";
                case "title":
                    return "100px";
                case "degree":
                    return "100px";
                case "introduction":
                    return "180px";
            }
        }
    }
}