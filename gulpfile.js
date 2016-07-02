var gulp = require('gulp'),
  gutil = require('gulp-util'),
  csslint = require('gulp-csslint'),
  jshint = require('gulp-jshint'),
  htmlhint = require('gulp-htmlhint'),
  del = require('del'),
  concat = require('gulp-concat'),
  jsmin = require('gulp-jsmin'),
  htmlmin = require('gulp-htmlmin'),
  csso = require('gulp-csso'),
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  sourcemaps = require('gulp-sourcemaps'),
  rev = require('gulp-rev'),
  pump = require('pump');

//run validation checks
gulp.task('html_check',function() {
  gulp.src('src/**/*.html')
    .pipe(htmlhint())
    .pipe(htmlhint.reporter());
});

gulp.task('css_check', function() {
  gulp.src('src/**/*.css')
    .pipe(csslint())
    .pipe(csslint.reporter('compact'));
});

gulp.task('js_check', function() {
  return gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default', { verbose: true }));
});

//optimize and minify images
gulp.task('minImages', () =>
    gulp.src('src/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest('dist'))
);

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
      .pipe(rename({suffix: '.min.js'}))
      .pipe(gulp.dest('dist'));
});

//copy markdown help file
gulp.task('copyMD', function() {
  gulp.src('src/*.md').pipe(gulp.dest('dist'));
});


//delete dist folder in preparation for next build.
gulp.task('wipe_dist', function() {
  return del.sync('dist/**/*');
})

//clear caches
gulp.task('clear_cache', function (callback) {
  return cache.clearAll(callback)
})


gulp.task('default', function() {
  return gutil.log('Run, Gulp, ruuuuuun! So I ran. And I ran and I ran and I ran!');
});