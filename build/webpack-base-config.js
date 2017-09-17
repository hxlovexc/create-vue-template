/**
 * @author [小缘]
 * @email [1440806569@qq.com]
 * @create date 2017-09-13 05:59:02
 * @modify date 2017-09-13 05:59:02
 * @desc [项目公用基础配置]
*/

const config = require('../config/');
const utils = require('./utils');
const resolve = require('./webpack-common-resolve');
const webpack = require('webpack');
const webpackProgress = require('progress-bar-webpack-plugin');
const ProgressBar = require('progress-bar-webpack-plugin');
const NotifierPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');

// 生产环境才可以配置是否抽取css
const extraction = utils.isBuild && config.build.extraction;

let webpackCconfig = {
  entry: utils.initMain(
    utils.getFiles(config.entry),
    utils.isBuild
  ),
  output: {
    path: utils.resolve(config.build.outputPath),
    publicPath: config[process.env.mode].publicPath
  },
  resolve,
  module: {
    rules: [
      // css loader
      ...utils.cssLoader(extraction),
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [utils.resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: utils.generationCssLoader(extraction)
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [utils.resolve('src')]
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          attrs: ['img:src', 'link:href']
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('images/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('font-icon/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    ...utils.initView(utils.getFiles(config.views)),
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
    }),
    new StyleLintPlugin({
      files: ['src/**/*.css', 'src/**/*.scss', 'src/**/*.sass', 'src/**/*.less']
    })
  ]
};

// 判断是否dll
if (config.dll.list.length) {
  const dir = utils.resolve(`../src/${config[process.env.mode].assetsDir}/${config.dll.manifestName}`);
  const libDir = dir.slice(0, dir.lastIndexOf('/') + 1);
  const outputPath = dir.slice(dir.indexOf(`/${config[process.env.mode].assetsDir}/`), dir.lastIndexOf('/'));
  webpackCconfig.plugins = webpackCconfig.plugins.concat([
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(utils.resolve(dir))
    }),
    new AddAssetHtmlPlugin([
      {
        filepath: utils.resolve(libDir + require(dir).fileName),
        outputPath: outputPath,
        publicPath: outputPath,
        includeSourcemap: false
      }
    ])
  ]);
}

module.exports = webpackCconfig;
