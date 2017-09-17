/**
 * @author [小缘]
 * @email [1440806569@qq.com]
 * @create date 2017-09-13 06:02:22
 * @modify date 2017-09-13 06:02:22
 * @desc [配置文件]
*/

module.exports = {
  // // js入口
  // entry: './src/index.js',
  // // html入口
  // view: './src/index.html',
  // js入口
  entry: '../src/views/**/*.js',
  // html入口
  views: '../src/views/**/*.html',
  dll: {
    manifestName: '/lib/manifest.json',
    // list
    list: [
      'vue',
      'vue-router',
      'vuex'
    ],
    // 开发模式下才打包的dll
    producedDll: []
  },
  dev: {
    port: 3030,
    publicPath: '/',
    autoOpenBrowser: true,
    sourceType: '#cheap-module-eval-source-map',
    cssSourceMap: false,
    assetsDir: 'static'
  },
  build: {
    outputPath: '../dist/',
    publicPath: '/',
    sourceType: '#source-map',
    cssSourceMap: true,
    assetsDir: 'static',
    jsMinify: true,
    extraction: true,
    htmlMinify: true
  }
};
