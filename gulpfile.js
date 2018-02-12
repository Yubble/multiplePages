var gulp = require('gulp')
var sftp = require('gulp-sftp')
gulp.task('default', function () {
  return gulp.src('dist/**/*')
    .pipe(sftp({
      host: '123.56.134.199',
      user: 'read',
      pass: '4ZfGtmOx',
      remotePath: '/home/cm_user/Dingdang/Doraemon_cube/apache-tomcat-7.0.61/webapps/webpackTest'
    }))
});