module.exports = {
    // webpack-dev-server 相关配置
    publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
    devServer: {
        /* 自动打开浏览器 */
        open: false,
        host: "localhost", // 局域网和本地访问
        port: 8000,
        https: false,
        hotOnly: false,

        /* 使用代理 */
        proxy: {
            "/smartedge": {
                /* 目标代理服务器地址 */
                target: "http://82.156.212.43:5000",
                /* 允许跨域 */
                changeOrigin: true,
                ws: true,
                // logLevel: true,
                // pathRewrite: {
                //     "^/smartedge": "/smartedge"
                // }
            }
        },
        before: () => {}
    },
    // 第三方插件配置
    // pluginOptions: {}
    lintOnSave: false
};