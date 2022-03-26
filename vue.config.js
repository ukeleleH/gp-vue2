module.exports = {
    devServer: {
        // port: 8081,
        port: 3000,
        proxy: {
            "/api": {
                target: "http://localhost:8080",
                changeOrigin: true,
                pathRewrite: { '^\/api': '' },
            }
        }
    },
    lintOnSave: "warning"
}