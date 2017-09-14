/**
 * @author [小缘]
 * @email [1440806569@qq.com]
 * @create date 2017-09-13 05:49:53
 * @modify date 2017-09-13 05:49:53
 * @desc [工具函数]
*/
const path = require('path');
const os = require('os');

module.exports = {
  resolve (dir) {
    let base = '../';
    return dir.indexOf(base) === 0 ? path.resolve(__dirname, dir) : path.resolve(__dirname, base, dir);
  },
  curMode: 'dev',
  //获取内网ip
  getLocalIp () {
    let ip = [];
    let ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
      if(ifaces[dev][1].address.indexOf('192.168') != -1) {
        return ifaces[dev][1].address;
      }
    }
    return ip;
  }
};
