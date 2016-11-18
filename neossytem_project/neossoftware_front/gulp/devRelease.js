'use strict';

//author neossoftware corporation

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var express = require('express');
var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files']
});

var wiredep = require('wiredep').stream;


var _ = require('lodash');

var server;


gulp.task('dev-fonts', ['ui-grid-fonts'], function() {
    return gulp.src($.mainBowerFiles())
        .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
        .pipe($.flatten())
        .pipe(gulp.dest(path.join(conf.paths.devDist, 'fonts')));
});

//this is a specific case where fonts is located in lib destination
//typical fonts is located in fonts directory but for ui-grid is a exception
gulp.task('ui-grid-fonts', function() {
    return gulp.src($.mainBowerFiles())
        .pipe($.filter('**/ui-grid.{eot,svg,ttf,woff,woff2}'))
        .pipe($.flatten())
        .pipe(gulp.dest(path.join(conf.paths.devDist, 'lib')));
});


gulp.task('dev-copy-lib', ['copy-app', 'dev-fonts'], function() {
    //it get all references of bower (JS and CSS)
    var assets = require('wiredep')(_.extend({}, conf.wiredep));
    var srcList = [];
    //create an array of dependencies
    srcList.push.apply(srcList, assets.js);
    srcList.push.apply(srcList, assets.css);
    //copy from bower to dev-release/lib
    return gulp
        .src(srcList)
        .pipe(gulp.dest(path.join(conf.paths.devDist, 'lib')));
});


//clean dist folder
gulp.task('clean', function() {
    return gulp.src(conf.paths.devDist, {
            read: false
        })
        .pipe(clean());
});

gulp.task('copy-app', function() {
    return gulp.src(['src/**', '!src/index.html',
            '!src/bower_components{,/**}'
        ])
        .pipe(gulp.dest(conf.paths.devDist));
});

gulp.task('dev-html', function(done) {
    runSequence('inject', 'dev-js-replace', 'dev-css-replace', done);
});

gulp.task('inject', function() {

    var injectScripts = gulp.src([
        path.join(conf.paths.src, '/directives/**/*.directive.js'),
        path.join(conf.paths.src, '/singleapp/**/*modules.js'),
        path.join(conf.paths.src, '/singleapp/**/*constants.js'),
        path.join(conf.paths.src, '/singleapp/**/*.route.js'),
        path.join(conf.paths.src, '/singleapp/**/*.services.js'),
        path.join(conf.paths.src, '/singleapp/**/*.controller.js'),
        path.join(conf.paths.src, '/singleapp/**/*Controller.js'),
    ]);


    var injectStyles = gulp.src([
        path.join(conf.paths.src, '/css/**/*.css')
    ], {
        read: false
    });

    var injectOptions = {
        ignorePath: [conf.paths.src],
        addRootSlash: false
    };

    /*
     */

    return gulp.src('src/index.html')
        .pipe($.inject(injectStyles, injectOptions))
        .pipe($.inject(injectScripts, injectOptions))
        .pipe(wiredep(_.extend({}, conf.wiredep)))
        .pipe(gulp.dest(conf.paths.devDist));
});


gulp.task('dev-css-replace', function() {
    return gulp.src(path.join(conf.paths.devDist, '*.html'))
        .pipe($.replace(/<link rel="stylesheet" href="bower_components\/.*\/(.*)"\s*?\/>/g, '<link rel="stylesheet" href="lib/$1" >'))
        .pipe(gulp.dest(conf.paths.devDist));
});

gulp.task('dev-js-replace', function() {
    return gulp.src(path.join(conf.paths.devDist, '*.html'))
        .pipe($.replace(/<script src="bower_components\/.*\/(.*)"\s*?>/g, '<script src="lib/$1">'))
        .pipe(gulp.dest(conf.paths.devDist));
});


gulp.task('server', function() {
    server = express();
    server.use(express.static(conf.paths.devDist));
    server.listen(8000);
    browserSync({
        proxy: 'localhost:8000'
    });
    console.log('server is : http://localhost:8000/');
});


gulp.task('dev-release', ['dev-copy-lib', 'dev-html', 'server']);
