/**
 * @author [小缘]
 * @email [1440806569@qq.com]
 * @create date 2017-09-13 06:02:22
 * @modify date 2017-09-13 06:02:22
 * @desc [配置文件]
*/

module.exports = {
  // js入口
  entry: './src/index.js',
  // html入口
  view: './src/index.html',
  dev: {
    port: 3030,
    publicPath: '/',
    autoOpenBrowser: true
  },
  build: {
    outputPath: '../dist/',
    publicPath: '/',
    sourceType: '#source-map'
  }
};
