var gulp = require('gulp'),
  csslint = require('gulp-csslint'),
  jshint = require('gulp-jshint'),
  htmlhint = require('gulp-htmlhint'),
  del = require('del'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  htmlmin = require('gulp-htmlmin'),
  cssmin = require('gulp-csso'),
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  rev = require('gulp-rev');

//run validation checks
gulp.task('html_check',function() {
  gulp.src('**/*.html')
    .pipe(htmlhint())
    .pipe(htmlhint.reporter());
});

gulp.task('css_check', function() {
  gulp.src('**/*.css')
    .pipe(csslint())
    .pipe(csslint.reporter('compact'));
});

gulp.task('js_check', function() {
  return gulp.src('**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default', { verbose: true }));
});




gulp.task('default', function() {
  // place code for your default task here
});