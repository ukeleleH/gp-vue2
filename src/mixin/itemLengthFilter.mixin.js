export default {
    filters: {
        itemLengthFilter(data) {
            switch (data) {
                case "sno":
                    return 10;
                case "tno":
                    return 10;
                case "ano":
                    return 10;
                case "name":
                    return 32;
                case "password":
                    return 20;
                case "tel":
                    return 11;
                case "gender":
                    return 2;
                case "major":
                    return 32;
                case "class_grade":
                    return 32;
                case "qq":
                    return 12;
                case "title":
                    return 10;
                case "degree":
                    return 10;
                case "isInsideSchool":
                    return 1;
                case "introduction":
                    return 255;
            }
        },
    },
}