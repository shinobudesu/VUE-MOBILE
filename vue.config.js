const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir);
}
const autoprefixer = require('autoprefixer');
const pxtoviewport = require('postcss-px-to-viewport');
const pxtorem = require('postcss-pxtorem');
module.exports = {
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'assets',
    lintOnSave: false,
    productionSourceMap: false,
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer({ browsers: ['Android >= 4.0', 'iOS >= 8'] }),
                    pxtoviewport({
                        viewportWidth: 375
                    }),
                    pxtorem({
                        rootValue: 37.5,
                        propList: ['*']
                    })
                ]
            }
        }
    },
    devServer: {
        // proxy: {
        //     '/api': {
        //         target: '',
        //         ws: true,
        //         changeOrigin: true
        //     }
        // }
        proxy: "http://localhost:8080"
    },
    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("src"));
        config
            .entry('index')
            .add('babel-polyfill');
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
        } else {
            // 为开发环境修改配置...
        }
    }
}