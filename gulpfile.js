var gulp = require('gulp'),    gutil = require('gulp-util'),    jshint = require('gulp-jshint'),    concat = require('gulp-concat'),    connect = require('gulp-connect'),    Server = require('karma').Server;
var jsSrc = 'js/*.js';var cssSrc = 'css/*.scss';gulp.task('test', function (done) {  new Server({
     configFile: require('path').resolve('karma.conf.js'),
     singleRun: true
   }, done).start();
 });

 gulp.task('default', ['watch']);

 gulp.task('jshint', function() {
  return gulp.src(jsSrc)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
  });

  /*gulp.task('build-css', function() {
  return gulp.src(cssSrc)
    .pipe(sass())
    .pipe(gulp.dest('dist/css'));
  });*/

  gulp.task('build-js',['jshint'], function() {
  return gulp.src(jsSrc)
      .pipe(concat('bundle.js'))
      //only uglify if gulp is ran with '--type production'
      .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
      .pipe(gulp.dest('dist/js'))
      .pipe(connect.reload());
});

  gulp.task('watch', function() {
    gulp.watch(jsSrc, ['build-js']);
    //gulp.watch(cssSrc, ['build-css']);
    gulp.watch('index.html');
    connect.server({
            root: 'dist',
            port: 9999,
            livereload: true
        });
  });

  gulp.task('build',['jshint','build-js'], function(){
    gulp.src('*.html')
    .pipe(gulp.dest('dist/'))
    gulp.src('lib/*.js')
    .pipe(gulp.dest('dist/lib'))
    gulp.src('css/*.css')
    .pipe(gulp.dest('dist/css'));
    console.log('Build successful');
  });
