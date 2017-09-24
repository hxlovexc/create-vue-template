/**
 * @author [小缘]
 * @email [1440806569@qq.com]
 * @create date 2017-09-16 12:14:57
 * @modify date 2017-09-16 12:14:57
 * @desc [dll预编译]
*/
const webpack = require('webpack');
const notifier = require('node-notifier');
const merge = require('webpack-merge');
const fs = require('fs');
const config = require('../config/');
const utils = require('./utils');
const mode = process.env.mode === 'build';
const manifestName = config.dll.manifestName;
// lib路径
let outputPath = `../src/${config[process.env.mode].assetsDir}/${manifestName.slice(0, manifestName.lastIndexOf('/') + 1)}`;
let manifestPath = utils.resolve(`${outputPath}/${manifestName.slice(manifestName.lastIndexOf('/') + 1)}`);

if (Array.isArray(config.dll.list) === false) {
  dllError('config.dll 类型错误, dll只能为数组');
}

if (config.dll.list.length === 0) {
  dllError('dll不能为空');
}

let webpackConfig = {
  entry: {
    lib: config.dll.list
  },
  output: {
    path: utils.resolve(outputPath),
    filename: '[name].[chunkhash:7].js',
    library: '[name]'
  },
  devtool: config.dev.sourceType,
  resolve: utils.initResolve(config.resolve),
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [utils.resolve('src')]
      }
    ]
  },
  plugins: [
    new webpack.DllPlugin({
      path: manifestPath,
      name: '[name]',
      context: __dirname,
    })
  ]
};

// 判断是否合并dev
if (mode) {
  webpackConfig = merge(webpackConfig, {
    entry: {
      lib: config.dll.producedDll
    },
    devtool: config.build.sourceType
  });
  // 压缩
  config.build.jsMinify && webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    })
  );
}

webpackConfig.entry.lib.map((item) => {
  return item.indexOf('.') === 0 ? utils.resolve(item) : item;
});

// 打包公用库
webpack(webpackConfig, (error, stats) => {
  if (error) dllError('编译失败');
  setName(Object.keys(stats.compilation.assets)[0]);
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n');
  console.log('公用库编译完成...');
  notifier.notify({
    title: 'dll',
    message: '公用库编译完成...'
  });
});

function dllError (msg) {
  msg = `xui-cli => ${msg}`;
  notifier.notify({
    title: 'dll编译错误',
    message: msg
  });
  throw Error(msg);
}

function setName (name) {
  fs.readFile(manifestPath, 'utf8', (err, data) => {
    if (err) console.log(err);
    data = JSON.parse(data);
    data.fileName = name;
    fs.writeFileSync(
      manifestPath,
      JSON.stringify(data)
    );
  });
}
