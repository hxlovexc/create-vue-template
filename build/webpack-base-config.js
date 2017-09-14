/**
 * @author [小缘]
 * @email [1440806569@qq.com]
 * @create date 2017-09-13 05:59:02
 * @modify date 2017-09-13 05:59:02
 * @desc [项目公用基础配置]
*/

const webpack = require('webpack');
const config = require('../config/');
const utils = require('./utils');
const webpackProgress = require('progress-bar-webpack-plugin');
const ProgressBar = require('progress-bar-webpack-plugin');
const NotifierPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const resolve = require('./webpack-common-resolve');

module.exports = {
  entry: utils.resolve(config.entry),
  output: {
    path: utils.resolve(config.build.outputPath),
    publicPath: config[utils.curMode].publicPath,
    filename: '[name].js'
  },
  resolve,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: [utils.resolve('src')]
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ['vue-style-loader']
          }
        }
      }
    ]
  },
  plugins: [
    new ProgressBar(),
    new NotifierPlugin({
      onErrors (severity, errors) {
        if (severity !== 'error') return;
        const error = errors[0];
        notifier.notify({
          title: 'webpack编译错误',
          message: severity + ': ' + error.name,
          subtitle: error.file || ''
        });
      }
    })
  ]
};
