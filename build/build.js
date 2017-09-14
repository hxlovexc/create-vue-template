/**
 * @author [小缘]
 * @email [1440806569@qq.com]
 * @create date 2017-09-13 06:52:08
 * @modify date 2017-09-13 06:52:08
 * @desc [build的入口]
*/

const webpack = require('webpack');
const webpackConfig = require('./webpack-build-config');
const chalk = require('chalk');

// 执行编译
webpack(webpackConfig, (error, stats) => {
  if (error) {
    console.log(chalk.red('编译失败 => ', error));
    return;
  } 
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }));
});
