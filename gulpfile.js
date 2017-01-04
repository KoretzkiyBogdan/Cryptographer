'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');

gulp.task('babel', function() {
    return gulp
      .src('src/*js')
      .pipe(babel({
        presets: ['es2015']
      }))
      .pipe(gulp.dest('bundles'))
});

gulp.task('sass', function() {
    return gulp
      .src('src/*.scss')
      .pipe(sass({
          outputStyle: 'compressed'
      }).on('error', sass.logError))
      .pipe(gulp.dest('bundles'));
});

gulp.task('compress:watch', function() {
    return gulp.watch('src/*.js', ['babel']);
});

gulp.task('sass:watch', function() {
    return gulp.watch('src/*.scss', ['sass']);
});

gulp.task('watch', function() {
    return gulp.watch(['src/*scss', 'src/*js'], ['sass', 'babel']);
});

gulp.task('default', ['sass', 'babel']);