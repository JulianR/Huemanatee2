/// <binding ProjectOpened='default' />
var gulp = require('gulp');
var ts = require('gulp-typescript');
var gutil = require('gulp-util');
var debug = require('gulp-debug');
var cache = require('gulp-cached');

var tsProject = ts.createProject('app/tsconfig.json');

gulp.task('setup', function (done) {

  var copyToLibs = function (lib) {
    return gulp.src([
      './node_modules/' + lib + '/**/*'
    ]);
  }

  gulp.src([
    './node_modules/angular2/bundles/*.js',
    './node_modules/es6-shim/es6-shim.min.js',
    './node_modules/systemjs/dist/*.js',
    './node_modules/rxjs/bundles/*.js',
    './node_modules/bootstrap/dist/**/*',
     './node_modules/three-js/three.js'
  ], { base: "./node_modules" })
  .pipe(gulp.dest('./wwwroot/libs/'));

});

//gulp.task('ts', function (done) {
//  var tsResult = gulp.src([
//      'scripts/*.ts'
//  ])
//  .pipe(debug())
//  .pipe(ts(tsProject), undefined, ts.reporter.fullReporter());
//  return tsResult.js.pipe(gulp.dest('./wwwroot/js'));
//});

var sass = require('gulp-sass');

gulp.task('sass', function (done) {
  gulp.src('./scss/**/*')
  .pipe(cache('compile-sass'))
  .pipe(debug())
  .pipe(sass())
  .pipe(gulp.dest('./wwwroot/css/'))
  .on('end', done);
});

gulp.task('js', function (done) {
  gulp.src('./app/*.js')
  .pipe(cache('copy-js'))
  .pipe(debug())
  .pipe(gulp.dest('./wwwroot/app/'))
  .on('end', done);
});

gulp.task('watch', ['watch.js', 'watch.scss']);

gulp.task('watch.js', function () {
  return gulp.watch('app/*.js', ['js']);
});

gulp.task('watch.scss', function () {
  return gulp.watch('./scss/**/*.scss', ['sass']);
});

gulp.task('default', ['setup', 'watch']);