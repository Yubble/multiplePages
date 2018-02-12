// 首先存储好当前环境变量
if (process.argv[3] === 'server') {
  process.env.NODE_ENV = 'develop';
} else {
  process.env.NODE_ENV = 'production';
}

const webpack = require('webpack');
const path = require('path');
// 用以获取需要导入的js文件数组
const { getEntry } = require('./webpack-config/util');
const projectList = getEntry();

// 导入webpack-plugins插件部分
const webpackPlugin = require('./webpack-config/webpack-plugins');
// 导入webpack-module部分
const webpackModule = require('./webpack-config/webpack-module');
const { rules } = webpackModule;

module.exports = {
  watch: true,
  // 项目入口
  entry: projectList,
  // 项目出口
  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '../static/',
    filename: '[name]/static/entry.js'
  },
  plugins: webpackPlugin,
  module: {
    rules: rules
  },
  devServer: {
    open: true,       // 自动打开浏览器
    port: 8090,
    contentBase: './dist',
    publicPath: '/assets',
    inline: true, // 可以监控js变化
    hot: true, // 热启动
    // compress: false,
    // watchContentBase: true,
    // clientLogLevel: "none",
    // watchOptions: {
    //   aggregateTimeout: 300,
    //   poll: true
    // }
  }
}
