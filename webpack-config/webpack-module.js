const path = require('path');
// 用以分离静态文件的东西
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const assetpatch = (paths) => {
  if (process.env.NODE_ENV == 'develop') {
    return path.posix.join("/static", paths)
  } else {
    // 如果在域名的根目录下则使用以下方法
    return path.posix.join("/activity/static", paths)
  }
}

let imgSrc = assetpatch( 'img/[name]-[hash:7].[ext]' );
let shareImgSrc = assetpatch( 'img/shareIcon/[name].[ext]' );

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
            name: imgSrc
          }
        },
        {
          loader: 'image-webpack-loader'
        }
      ]
    },
    {
      test: /\.(jpg|png|gif)$/, 
      loader: 'file-loader',
      options: {
        name: shareImgSrc
      },
      include: [path.resolve(__dirname, '../pages/assest/shareIcon')]
    }
  ]
}



module.exports = webpackModule;