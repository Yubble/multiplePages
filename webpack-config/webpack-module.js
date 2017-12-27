const path = require('path');
// 用以分离静态文件的东西
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const assetpatch = function (paths) {
  return path.posix.join("/static", paths)
}

let imgSrc = '';
console.log('当前环境是：' + process.env.NODE_ENV);
// 判断是否开发或生产环境
if (process.env.NODE_ENV === 'develop') {
  // 修改图片路径
  imgSrc = 'static/img/[name]-[hash:7].[ext]';
} else {
  imgSrc = assetpatch( 'img/[name]-[hash:7].[ext]' );
}


webpackModule = {
  rules: [
    {
      test: /\.html$/,
      loader: 'html-loader'
    },
    {
      test: /\.js$/,
      use: [{
        loader: 'babel-loader'
      }],
      exclude: [
        path.resolve(__dirname, 'node_modules')
      ]
    },
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader']
      }),
      exclude: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, './common/style')
      ]
    },
    {
      test: /\.(jpg|png|gif)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8291,
            // name: assetpatch('img/[name]-[hash:7].[ext]')
            // name: 'static/img/[name]-[hash:7].[ext]'
            name: imgSrc
          }
        },
        {
          loader: 'image-webpack-loader'
        }
      ]
    }
  ]
}



module.exports = webpackModule;