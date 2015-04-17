var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');

gulp.task('build-js', function(argument){
    return gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build'));
});

gulp.task('build-json', function(argument){
    return gulp.src('src/**/*.json')
        .pipe(gulp.dest('build'));
});

gulp.task('build', ['build-js', 'build-json']);

gulp.task('default', ['build-js', 'build-json'], function() {
    gulp.watch('src/**/*', ['build']);
});