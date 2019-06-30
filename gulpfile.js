const { dest, parallel, series, src, watch } = require('gulp');
const babel = require('gulp-babel');

function buildJS() {
  return src('src/**/*.js', { sourcemaps: true })
    .pipe(babel())
    .pipe(dest('build', { sourcemaps: '.' }));
}

function buildJSON() {
  return src('src/**/*.json')
    .pipe(dest('build'));
}

exports.build = series(buildJS, buildJSON);

exports.default = () => watch('src/**/*', { ignoreInitial: false }, exports.build);
