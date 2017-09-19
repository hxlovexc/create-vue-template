/**
 * @author [小缘]
 * @email [1440806569@qq.com]
 * @create date 2017-09-13 06:02:22
 * @modify date 2017-09-13 06:02:22
 * @desc [配置文件]
*/

module.exports = {<% if(type) { %>
  // js入口
  entry: './src/main.js',
  // html入口
  view: './src/index.html',<% } else { %>
  // js入口
  entry: '../src/views/**/*.js',
  // html入口
  view: '../src/views/**/*.html',<% } %>
  <% if(extractingType === 'dll') { %>dll: {
    manifestName: '/lib/manifest.json',
    // list
    list: [
      'vue',<% if(router){ %>
      'vue-router'<% } %>
    ],
    // 生产模式下才打包的依赖
    producedDll: []
  },<% } %>
  dev: {
    port: 8080,
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
