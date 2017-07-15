const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');

gulp.task('build-js', () => {
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build'));
});

gulp.task('build-json', () => {
  return gulp.src('src/**/*.json')
    .pipe(gulp.dest('build'));
});

gulp.task('build', ['build-js', 'build-json']);

gulp.task('default', ['build-js', 'build-json'], () => {
  gulp.watch('src/**/*', ['build']);
});