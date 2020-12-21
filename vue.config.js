module.exports = {
    publicPath: './',             // 设置公共路径
    outputDir : 'dist',           // Build 输出文件目录
    assetsDir : 'static',         // 静态资源文件夹名称
    lintOnSave: false,            // 设置是否在开发环境下每次保存代码时都启用 eslint
    productionSourceMap: false,   // 去除打包后 js 的 map 文件
    devServer: {                  // 启动项目后自动在浏览器中打开
        open: true,
        proxy: null
    },
    // 去除 console
    configureWebpack: (config) => {
        // 判断为生产模式下，开发模式会用到 console
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer.map((arg) => {
                const option = arg.options.terserOptions.compress;
                option.drop_console = true;
                return arg;
            });
        }
    },
};