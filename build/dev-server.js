/**
 * @author [小缘]
 * @email [1440806569@qq.com]
 * @create date 2017-09-13 06:52:24
 * @modify date 2017-09-13 06:52:24
 * @desc [dev入口]
*/

process.env.mode = 'dev';
const webpack = require('webpack');
const express = require('express');
const path = require('path');
const open = require('open');
const historyApiback = require('connect-history-api-fallback')();
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack-dev-config');
const chalk = require('chalk');
const config = require('../config');
const utils = require('./utils');

const app = express();
const compiler = webpack(webpackConfig);

//文件加载到内存
let dev = devMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  // 关闭错误提示 - 使用friendly-errors-webpack-plugin
  quiet: true
});

//热更新
let hotUpdate = hotMiddleware(compiler, {
  log: false,
  heartbeat: 2000
});

// html强制刷新
compiler.plugin('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, back) => {
    hotUpdate.publish({ action: 'reload' });
    back();
  })
});

app.use(historyApiback);
app.use(dev);
app.use(hotUpdate);
// 资源路径
app.use(express.static(path.resolve(__dirname, '../src/')));

console.log(chalk.cyan('-> 正在启动开发服务'));

dev.waitUntilValid(() => {
  let url = `http://localhost:${config.dev.port}`;
  console.log(chalk.cyan(`-> 开发服务启动完成`));
  console.log(chalk.cyan(`-> 请访问${url} or http://${utils.getLocalIp()}:${config.dev.port}`));
  //打开浏览器
  config.dev.autoOpenBrowser && open(url);
});

//监听端口
app.listen(config.dev.port);