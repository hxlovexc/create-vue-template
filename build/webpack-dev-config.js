/**
 * @author [小缘]
 * @email [1440806569@qq.com]
 * @create date 2017-09-13 11:59:59
 * @modify date 2017-09-13 11:59:59
 * @desc [开发环境]
*/

const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const baseConfig = require('./webpack-base-config');
const config = require('../config/');
const utils = require('./utils');
const templatePath = utils.resolve(config.view);
<% if(type){ %>// hot
const entry = baseConfig.entry;
Object.keys(baseConfig.entry).forEach((item) => {
  entry[item] = ['./build/reload'].concat(entry[item]);
});<% } %>

const buildConfig = {
  devtool: config.dev.sourceType,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()<% if(type){ %>,
    new HtmlWebpackPlugin({
      filename: path.basename(templatePath),
      template: templatePath,
      inject: true
    })<% } %>
  ]
};

module.exports = merge(baseConfig, buildConfig);
