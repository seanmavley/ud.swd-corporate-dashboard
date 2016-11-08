var gulp = require('gulp'),
  browser = require('browser-sync').create(),
  $ = require('gulp-load-plugins')(),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  historyApiFallback = require('connect-history-api-fallback');

var port = process.env.SERVER_PORT || 3000;

//script paths
var jsFiles = 'app/scripts/**/*.js',
  jsDest = 'app/build';

// build javascripts
gulp.task('scripts', function() {
  return gulp.src(jsFiles)
    .pipe(concat('corp.darshboard.js'))
    .pipe(gulp.dest(jsDest))
    .pipe(rename('corp.dashboard.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDest));
});

// server and run in browser
gulp.task('serve', function() {
  browser.init({
    server: 'app/',
    port: port,
    // rewrites urls to support clean URLs without the '#/'s
    middleware: [historyApiFallback()] 
  });
  // watch and rebuild scripts
  gulp.watch('app/**/*.*', ['scripts'])
    .on('change', browser.reload);
});

gulp.task('default', ['serve']);
