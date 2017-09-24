/**
 * @author [小缘]
 * @email [1440806569@qq.com]
 * @create date 2017-09-14 12:00:10
 * @modify date 2017-09-14 12:00:10
 * @desc [生产环境]
*/
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack-base-config');
const config = require('../config');
const utils = require('./utils');
const ExtractTextPlugin = require('extract-text-webpack-plugin');<% if(type){ %>
const templatePath = utils.resolve(config.view);<% } %>

const buildConfig = {
  output: {
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
  },
  devtool: config.build.sourceType,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.ModuleConcatenationPlugin()<% if(type){ %>,
    new HtmlWebpackPlugin({
      filename: path.basename(templatePath),
      template: templatePath,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })<% } %><% if(extractingType !== 'dll') { %>,
    // 将依赖的公用模块打包
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        );
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    new webpack.HashedModuleIdsPlugin()<% } %>
  ]
};

config.build.extraction && buildConfig.plugins.push(
  new ExtractTextPlugin({
    filename: utils.assetsPath('css/[name].[contenthash].css')
  })
);

module.exports = merge(baseConfig, buildConfig);
