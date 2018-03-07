const glob = require('glob');

module.exports = {
  // 获取所有pages中的js文件
  getEntry () {
    var dirs = glob.sync("./pages/**/*.js");
    var matchs = [], files = {};
    dirs.forEach(function (item) {
        item.replace(/\/(\w+)\/\w+.js$/, function($0, $1){
          if ($1) {
            files[$1] = item
          }
        })
    });
    return files;
  }
};