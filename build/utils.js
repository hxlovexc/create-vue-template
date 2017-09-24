/**
 * @author [小缘]
 * @email [1440806569@qq.com]
 * @create date 2017-09-13 05:49:53
 * @modify date 2017-09-13 05:49:53
 * @desc [工具函数]
*/
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const os = require('os');<% if(type === false){ %>
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');<% } %>
const config = require('../config');

let utils = {
  resolve (dir) {
    let base = '../';
    return dir.indexOf(base) === 0 ? path.resolve(__dirname, dir) : path.resolve(__dirname, base, dir);
  },
  isBuild: process.env.mode === 'build',
  // 获取内网ip
  getLocalIp () {
    let ip = [];
    let ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
      if (ifaces[dev][1].address.indexOf('192.168') !== -1) {
        return ifaces[dev][1].address;
      }
    }
    return ip;
  },
  generationCssLoader (extraction, isVue) {
    const cssLoader = {
      loader: 'css-loader',
      options: {
        minimize: this.isBuild,
        sourceMap: this.isBuild
      }
    };

    const styleLoader = isVue ? 'vue-style-loader' : 'style-loader';

    function generationLoader (loader) {
      let loaderList = [cssLoader];
      if (loader) {
        loaderList.push({
          loader: `${loader}-loader`,
          options: {
            minimize: this.isBuild,
            sourceMap: this.isBuild
          }
        });
      }
      // 单独抽取
      if (extraction) {
        return ExtractTextPlugin.extract({
          use: loaderList,
          fallback: styleLoader
        });
      }
      return [styleLoader].concat(loaderList);
    }

    return {
      css: generationLoader()<% if(cssPretreatment === 'less'){ %>,
      less: generationLoader('less')<% } %><% if(cssPretreatment === 'sass'){ %>,
      scss: generationLoader('sass'),
      sass: generationLoader('sass')<% } %><% if(cssPretreatment === 'stylus'){ %>,
      stylus: generationLoader('stylus'),
      styl: generationLoader('stylus')<% } %>
    };
  },
  cssLoader (extraction) {
    let loaderList = this.generationCssLoader(extraction);
    let arr = [];
    Object.keys(loaderList).forEach((item) => {
      arr.push({
        test: new RegExp('\\.' + item + '$'),
        use: loaderList[item]
      });
    });
    return arr;
  },
  assetsPath (filePath) {
    let rootDir = config[process.env.mode].assetsDir;
    return path.join(rootDir, filePath);
  }<% if(type === false){ %>,
  // 获取文件
  getFiles (_path) {
    let entries = {}, baseName;
    glob.sync(path.resolve(__dirname, _path)).forEach((entry) => {
      baseName = path.basename(entry, path.extname(entry));
      entries[baseName] = entry;
    });
    return entries;
  },
  getFilePath: (() => {
    const viewPath = config.view;
    const baseDir = viewPath.slice(viewPath.indexOf('/src/'), viewPath.indexOf('**/'));
    return (filename) => {
      filename = filename.replace(/\\/g, '/');
      return filename = filename.slice(filename.indexOf(baseDir) + baseDir.length, filename.length);
    };
  })(),
  getName (filePath) {
    const mianName = this.getFilePath(filePath);
    return mianName.slice(0, mianName.lastIndexOf('.'));
  },
  // initResolve
  initResolve (resolve) {
    let alias = resolve.alias;
    Object.keys(resolve.alias).forEach((key) => {
      alias[key] = alias[key].indexOf('src') === 0 || alias[key].indexOf('.') === 0 ? this.resolve(alias[key]) : alias[key];
    });
    return resolve;
  },
  // 多页html
  initView (views, state) {
    return Object.keys(views).map((key) => {
      let options = {
        filename: this.getFilePath(views[key]),
        template: views[key],
        inject: true,
        chunksSortMode: 'dependency',
        chunks: ['manifest', 'vendor', this.getName(views[key])]
      };
      if (state) {
        options.chunksSortMode = 'dependency';
        // 判断是否压缩
        if (config.build.htmlMinify) {
          options.minify = {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
          };
        }
      }
      return new HtmlWebpackPlugin(options);
    });
  },
  // 多页js
  initMain (main, state) {
    let entry = {};
    Object.keys(main).forEach((key) => {
      entry[this.getName(main[key])] = state ? main[key] : ['./build/reload'].concat(main[key]);
    });
    return entry;
  }<% } %>
};

module.exports = utils;
