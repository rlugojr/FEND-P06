var critical = require('critical');
var gulp = require('gulp'),
  gutil = require('gulp-util'),
  csslint = require('gulp-csslint'),
  jshint = require('gulp-jshint'),
  htmlhint = require('gulp-htmlhint'),
  bootlint = require('gulp-bootlint'),
  del = require('del'),
  concat = require('gulp-concat'),
  jsmin = require('gulp-jsmin'),
  htmlmin = require('gulp-htmlmin'),
  csso = require('gulp-csso'),
  imagemin = require('gulp-imagemin')
  responsive = require('gulp-responsive'),
  rename = require('gulp-rename'),
  sourcemaps = require('gulp-sourcemaps'),
  rev = require('gulp-rev'),
  pump = require('pump');
  reporters = require('reporters')
  logCapt = require('gulp-log-capture');
  
//set report collection level
reporters.debug = true;

//run validation checks
gulp.task('html_check',function() {
  gulp.src('src/**/*.html')
    .pipe(htmlhint())
    .pipe(htmlhint.reporter());
});


gulp.task('css_check', function() {
  gulp.src('src/**/*.css')
    .pipe(csslint())
    .pipe(csslint.reporter(reporters('gulp-csslint')));
});

gulp.task('js_check', function() {
  return gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(reporters('gulp-jshint')));
});

gulp.task('checkBoot', function(){
    return gulp.src('src/views/pizza.html')
    .pipe(bootlint({
            loglevel: 'debug',
            reportFn: function(file, lint, isError, isWarning, errorLocation) {
                var message = (isError) ? "ERROR! - " : "WARN! - ";
                if (errorLocation) {
                    message += file.path + ' (line:' + (errorLocation.line + 1) + ', col:' + (errorLocation.column + 1) + ') [' + lint.id + '] ' + lint.message;
                } else {
                    message += file.path + ': ' + lint.id + ' ' + lint.message;
                }
                console.log(message);
            },
            summaryReportFn: function(file, errorCount, warningCount) {
                if (errorCount > 0 || warningCount > 0) {
                    console.log("please fix the " + errorCount + " errors and "+ warningCount + " warnings in " + file.path);
                } else {
                    console.log("No problems found in "+ file.path);
                }
            }
        }));
});

//collect debug report
gulp.task('reports', function(){
  logCapt.start(console,'build')
  reporters.output = function(messages) {
    messages && messages.forEach(function(message) {
      console.log(message.description);
    });
  }
  logCapt.stop('xml')
});

//Copy static images downloaded from 3rd party site to distribution.
//They are already mini and compressed enough!
gulp.task('copyPics', function() {
  gulp.src('src/img/index*.jpg').pipe(gulp.dest('dist/img'));
});

//resize, create responsive sets and minify images
gulp.task('resizeImages', function() {
  return gulp.src(['src/**/*.{png,jpg}','!src/**/index*.{png,jpg}'])
    .pipe(responsive({
      'img/profilepic.jpg': {width: 70},
      'views/img/pizzeria.jpg': [{
          width: 360,
          rename: 'views/img/pizzeria@3x.jpg'
        },{
          width: 240,
          rename: 'views/img/pizzeria@2x.jpg'
        },{
          width: 120,
          rename: 'views/img/pizzeria@1x.jpg'
        }],
      'views/img/pizza.png': [{
          width: 200,
          rename: 'views/img/pizza@3x.png'
        },{
          width: 150,
          rename: 'views/img/pizza@2x.png'
        },{
          width: 100,
          rename: 'views/img/pizza@1x.png'
        }],
      'img/2048.png': [{
          width: 560,
          rename: 'img/2048@3x.png'
        },{
          width: 260,
          rename: 'img/2048@1x.png'
        }],
      'img/cam_be_like.jpg': [{
          width: 480,
          rename: 'img/cam_be_like@2x.jpg'
        },{
          width: 260,
          rename: 'img/cam_be_like@1x.jpg'
        }],
      'img/mobilewebdev.jpg': [{
          width: 600,
          rename: 'img/mobilewebdev@2x.jpg'
        },{
          width: 260,
          rename: 'img/mobilewebdev@1x.jpg'
        }],
       },{
          progressive: true,
          quality: 70,
          withMetadata: false,
          withoutEnlargement: false,

      }))
      .pipe(gulp.dest('src/img_tmp'))
});

gulp.task('imagemin',['resizeImages'],function(){
    gulp.src('src/img_tmp/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist'))
});


//optimize and minify HTML
gulp.task('minHTML', function() {
  return gulp.src('src/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(htmlmin({removeComments: true}))
    .pipe(htmlmin({HTML5: true}))
    .pipe(gulp.dest('dist'))
});


//optimize and minify CSS
gulp.task('minCSS', function () {
    return gulp.src('src/**/*.css')
        .pipe(csso({
            restructure: true,
            sourceMap: true,
            debug: true,
            comments: false
        }))
        .pipe(gulp.dest('dist'));
});

//optimize and minify JS
gulp.task('minJS', function () {
    gulp.src('src/**/*.js')
      .pipe(jsmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('dist'));
});

//copy markdown help file
gulp.task('copyMD', function() {
  gulp.src('src/*.md').pipe(gulp.dest('dist'));
});


//delete dist folder in preparation for next build.
gulp.task('wipe_dist', function() {
  return del.sync('dist/**/*');
});

//clear caches - not needed yet.
gulp.task('wipe_img_temp', function () {
  return del.sync('src/img_tmp/**/*');
});

gulp.task('resetBuild',['wipe_dist','wipe_img_temp']);

gulp.task('lintSource',['html_check','css_check','js_check','reports']);

gulp.task('imgProcess',['copyPics','imagemin']);

gulp.task('makeBuild',['imgProcess','minHTML','minCSS','minJS','copyMD']);

gulp.task('critical',['makeBuild'],function(cb){
  critical.generate({
        inline: true,
        base: 'dist/',
        src: 'index.html',
        dest: 'dist/index-critical.html',
        minify: true,
        width: 320,
        height: 480
    });
});

gulp.task('default', function() {
  return gutil.log('The available options are: resetBuild, lintSource, imgProcess or makeBuild.');
});