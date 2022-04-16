export default {
    filters: {
        columnWidthFilter(data) {
            switch (data) {
                case "id":
                    return "160px";
                case "name":
                    return "140px";
                case "tel":
                    return "180px";
                case "gender":
                    return "100px";
                case "major":
                    return "250px";
                case "class_grade":
                    return "200px";
                case "opportunity":
                    return "100px";
                case "qq":
                    return "140px";
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