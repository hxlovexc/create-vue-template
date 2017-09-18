/**
 * @author [小缘]
 * @email [1440806569@qq.com]
 * @create date 2017-09-13 10:17:14
 * @modify date 2017-09-13 10:17:14
 * @desc [自动更新]
*/
// 兼容ie
require('eventsource-polyfill');
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload();
  }
});
