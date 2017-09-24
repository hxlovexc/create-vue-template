/**
 * @author [小缘]
 * @email [1440806569@qq.com]
 * @create date 2017-09-13 05:59:02
 * @modify date 2017-09-13 05:59:02
 * @desc [项目公用基础配置]
*/<% if(extractingType === 'dll'){ %>
const webpack = require('webpack');
<% } %>
const config = require('../config/');
const utils = require('./utils');
const ProgressBar = require('progress-bar-webpack-plugin');
const NotifierPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');<% if(extractingType === 'dll'){ %>
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');<% } %><% if(stylelint){ %>
const StyleLintPlugin = require('stylelint-webpack-plugin');<% } %>

// 生产环境才可以配置是否抽取css
const extraction = utils.isBuild && config.build.extraction;

let webpackCconfig = {<% if(type === false){ %>
  entry: utils.initMain(
    utils.getFiles(config.entry),
    utils.isBuild
  ),<% } %><% if(type){ %>
  entry: {
    app: utils.resolve(config.entry)
  },<% } %>
  output: {
    path: utils.resolve(config.build.outputPath),
    publicPath: config[process.env.mode].publicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'static': utils.resolve('src/static'),<% if(router){ %>
      'views': utils.resolve('src/views'),<% } %>
      'components': utils.resolve('src/components')
    }
  },
  module: {
    rules: [
      // css loader
      ...utils.cssLoader(extraction),<% if(eslint){ %>
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [utils.resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },<% } %>
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
  plugins: [<% if(type === false){ %>
    ...utils.initView(utils.getFiles(config.view)),<% } %>
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
    }),<% if(stylelint){ %>
    new StyleLintPlugin({
      files: ['src/**/*.css', 'src/**/*.scss', 'src/**/*.sass', 'src/**/*.less']
    })<% } %>
  ]
};
<% if(extractingType === 'dll'){ %>
// dll
let dir = utils.resolve(`../src/${config[process.env.mode].assetsDir}/${config.dll.manifestName}`).replace(/\\/g, '\/');
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
<% } %>
module.exports = webpackCconfig;
