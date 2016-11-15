
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
//var wiredep = require('wiredep').stream;

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;
  console.log(wiredep());
  gulp.src('src/index.html')
    .pipe(wiredep())
    .pipe(gulp.dest('dist'));
});
