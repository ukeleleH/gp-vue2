export default {
    methods: {
        fileDownload(data, fileName) {
            let blob = new Blob([data], {
                type: "application/vnd.ms-excel;charset=utf-8",
            });
            // 针对ie浏览器
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob, fileName);
            } else {
                //非ie浏览器
                var downloadElement = document.createElement("a");
                var href = window.URL.createObjectURL(blob); //常见下载的链接
                downloadElement.href = href;
                downloadElement.download = fileName; //下载后文件名
                document.body.appendChild(downloadElement);
                downloadElement.click(); //点击下载
                document.body.removeChild(downloadElement); //下载完成移除元素
                window.URL.revokeObjectURL(href); //释放blob对象
            }
        }
    }
}