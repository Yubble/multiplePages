var gulp = require('gulp')
var sftp = require('gulp-sftp')

gulp.task('common', function () {
  return gulp.src('dist/**/*')
    .pipe(sftp({
      host: '123.56.134.199',
      user: 'read',
      pass: '4ZfGtmOx',
      remotePath: '/home/cm_user/Dingdang/fetest/activity'
    }))
});

gulp.task('wx-share', function () {
  return gulp.src('dist/**/*')
    .pipe(sftp({
      host: '123.56.134.199',
      user: 'read',
      pass: '4ZfGtmOx',
      remotePath: '/home/cm_user/Dingdang/fetest/activity'
    }))
});