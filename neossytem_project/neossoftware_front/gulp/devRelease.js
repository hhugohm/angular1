'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files']
});


var _ = require('lodash');


gulp.task('dev-fonts', function() {
    return gulp.src($.mainBowerFiles())
        .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
        .pipe($.flatten())
        .pipe(gulp.dest(path.join(conf.paths.devDist, 'fonts')));
});


gulp.task('dev-copy-lib', function() {
    //it get all references of bower (JS and CSS)
    var assets = require('wiredep')(_.extend({}, conf.wiredep));
    console.log(assets.css);
    var srcList = [];
    //create an array of dependencies
    srcList.push.apply(srcList, assets.js);
    srcList.push.apply(srcList, assets.css);
    //copy from bower to dev-release/lib
    return gulp
        .src(srcList)
        .pipe(gulp.dest(path.join(conf.paths.devDist, 'lib')));
});


gulp.task('dev-release', ['dev-copy-lib', 'dev-fonts']);
