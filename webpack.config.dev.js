const path = require("path");
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
// const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  // debug: true,
  devtool: 'inline-source-map',
  // noInfo: false,
  mode: "development",
  entry: [
    "eventsource-polyfill",
    "webpack-hot-middleware/client?reload=true",
    path.resolve(__dirname, "src/index")
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js',
    publicPath: "/"
  },
  // devtool: 'inline-source-map',
  module: {
    rules:[
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loaders: ['babel-loader']
      },
      {test: /\.css$/, use: [
        {loader: "style-loader"},
        {loader: "css-loader"},
        {loader: "sass-loader"}
      ]},
      {
          test: /\.(gif|jpe?g|png|svg)$/i,
          use: [{
              loader: 'url-loader'
          }]
      },
      {
          test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
          use: [{
              loader: 'url-loader'
          }]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: "./src",
    noInfo: true,
    debug: true,
    overlay: true
  }
};
