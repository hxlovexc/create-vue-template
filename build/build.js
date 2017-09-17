/**
 * @author [小缘]
 * @email [1440806569@qq.com]
 * @create date 2017-09-13 06:52:08
 * @modify date 2017-09-13 06:52:08
 * @desc [build的入口]
*/

process.env.mode = 'build';
const webpack = require('webpack');
const webpackConfig = require('./webpack-build-config');
const chalk = require('chalk');
const rm = require('rimraf');
const utils = require('./utils');
const config = require('../config/');
const ora = require('ora');
const notifier = require('node-notifier');

const log = ora('开始编译....');
log.start();

// 清空文件
rm(utils.resolve(config.build.outputPath), (error) => {
  if (error) throw error;
  // 执行编译
  webpack(webpackConfig, (error, stats) => {
    log.stop();
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
    // 完成
    console.log(chalk('编译完成'));
    notifier.notify({
      title: '编译完成',
      message: '项目构建完成'
    });
  });
});
