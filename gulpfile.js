'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

gulp.task('compress', function() {
  gulp.src('src/*.js')
    .pipe(uglify().on('error', console.error))
    .pipe(gulp.dest('bundles'));
});

gulp.task('sass', function () {
  return gulp.src('src/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('bundles'));
});

gulp.task('compress:watch', function () {
  gulp.watch('src/*.js', ['compress']);
});
 
gulp.task('sass:watch', function () {
  gulp.watch('src/*.scss', ['sass']);
});

gulp.task('watch', function() {
  gulp.watch(['src/*scss', 'src/*js'], ['sass', 'compress']);
});

gulp.task('default', ['sass', 'compress']);