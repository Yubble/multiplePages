const path = require('path');
// 用以分离静态文件的东西
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
            name: './static/img/[name].[hash:7].[ext]'
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