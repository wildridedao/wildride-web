const path = require('path');
const webpack = require('webpack');
module.exports = {
    chainWebpack: config => {
        //修复HMR
        config.resolve.symlinks(true);
    },
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    configureWebpack: {
	    performance: {
		    hints:false
	    }
    },
    lintOnSave : false,
    publicPath : './',
    assetsDir  : './',
    transpileDependencies: ['resize-detector'],     //图表 resize
    devServer : {
        disableHostCheck: true,
        port : 8888,
        proxy : {
            '/wild': {
                target:'http://www.wildride.cc',
                changeOrigin: true
            },
        }
    }
};
