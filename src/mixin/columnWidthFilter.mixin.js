export default {
    filters: {
        columnWidthFilter(data) {
            switch (data) {
                case "id":
                    return "150px";
                case "name":
                    return "150px";
                case "tel":
                    return "200px";
                case "gender":
                    return "150px";
                case "major":
                    return "180px";
                case "class_grade":
                    return "115px";
                case "opportunity":
                    return "105px";
                case "qq":
                    return "180px";
                case "title":
                    return "115px";
                case "degree":
                    return "105px";
                case "introduction":
                    return "200px";
            }
        }
    }
}