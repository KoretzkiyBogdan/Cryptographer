const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

const DIST = 'bundles';

gulp.task('babel', () => (
  gulp
    .src('src/*js')
    .pipe(sourcemaps.init())
    .pipe(babel({presets: ['es2015']}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(DIST))
));

gulp.task('sass', () => (
  gulp
    .src('src/*.scss')
    .pipe(sass({outputStyle: 'compressed'})
    .on('error', sass.logError))
    .pipe(gulp.dest(DIST))
));

gulp.task('watch', ['sass', 'babel'], () => gulp.watch(['src/*scss', 'src/*js'], ['sass', 'babel']));

gulp.task('default', ['sass', 'babel']);
