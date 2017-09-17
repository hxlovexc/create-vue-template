/**
 * @author [小缘]
 * @email [1440806569@qq.com]
 * @create date 2017-09-13 11:59:59
 * @modify date 2017-09-13 11:59:59
 * @desc [开发环境]
*/

const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack-base-config');
const config = require('../config/');
const utils = require('./utils');

const buildConfig = {
  devtool: config.dev.sourceType,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};

module.exports = merge(baseConfig, buildConfig);
