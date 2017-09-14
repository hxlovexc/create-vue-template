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
const baseConfig = require('./webpack-base-config');
const config = require('../config/');
const utils = require('./utils');

if (typeof baseConfig.entry === 'string') {
  baseConfig.entry = ['./build/reload'].concat(baseConfig.entry);
}

const buildConfig = {
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: config.view.slice(config.view.lastIndexOf('/') + 1, config.view.length),
      template: utils.resolve(config.view),
      inject: true
    })
  ]
};

module.exports = merge(baseConfig, buildConfig);