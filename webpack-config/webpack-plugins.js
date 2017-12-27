const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 用以获取需要导入的js文件数组
const { getEntry } = require('./util');

const webpackPlugins = [

  // new webpack.optimize.CommonsChunkPlugin({
  //   name: 'commons', // 这公共代码的chunk名为'commons'
  //   filename: '[name].bundle.js', // 生成后的文件名，虽说用了[name]，但实际上就是'commons.bundle.js'了
  //   minChunks: 1, // 设定要有4个chunk（即4个页面）加载的js模块才会被纳入公共代码。这数目自己考虑吧，我认为3-5比较合适。
  // }),
  
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    'window.$': 'jquery'
  }),

  /* 抽取出chunk的css */
  new ExtractTextPlugin('[name]/static/style.css'),
  
  new webpack.HotModuleReplacementPlugin()

];

var pageArr = getEntry();
for(let i in pageArr) {
  const htmlPlugin = new htmlWebpackPlugin({
    filename: `${i}/index.html`,
    template: `./pages/${i}/index.html`,
    chunks: [i],
    excludeChunks: ['./common/script']
  });
  webpackPlugins.push(htmlPlugin);
}

module.exports = webpackPlugins;