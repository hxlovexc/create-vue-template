/**
 * @author [小缘]
 * @email [1440806569@qq.com]
 * @create date 2017-09-14 12:00:10
 * @modify date 2017-09-14 12:00:10
 * @desc [生产环境]
*/
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack-base-config');
const config = require('../config');
const utils = require('./utils');

const buildConfig = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      filename: config.view.slice(config.view.lastIndexOf('/') + 1, config.view.length),
      template: utils.resolve(config.view),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
    })
  ]
};

module.exports = merge(baseConfig, buildConfig);
