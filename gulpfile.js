var gulp = require('gulp'),
  browser = require('browser-sync').create(),
  $ = require('gulp-load-plugins')(),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  cleanCSS = require('gulp-clean-css'),
  historyApiFallback = require('connect-history-api-fallback');

var port = process.env.SERVER_PORT || 3000;

//script paths
var jsFiles = 'app/scripts/**/*.js',
  cssFiles = 'app/styles/**/*.css',
  jsDest = 'app/build';

// build javascripts
gulp.task('scripts', function() {
  return gulp.src(jsFiles)
    .pipe(concat('corp.darshboard.js'))
    .on('error', function(e) {
      console.log(e);
    })
    .pipe(gulp.dest(jsDest))
    .pipe(rename('corp.dashboard.min.js'))
    .pipe(uglify())
    .on('error', function(e) {
      console.log(e);
    })
    .pipe(gulp.dest(jsDest));
});

gulp.task('css', function() {
  gulp.src(cssFiles)
    .pipe(concat('corp.css'))
    .pipe(gulp.dest('app/build'))
    .pipe(rename('corp.min.css'))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('app/build'));
})

// server and run in browser
gulp.task('serve', ['scripts', 'css'], function() {
  browser.init({
    server: 'app/',
    port: port,
    // rewrites urls to support clean URLs without the '#/'s
    middleware: [historyApiFallback()] 
  });
  // watch and rebuild scripts
  gulp.watch('app/**/*.js', ['scripts'])
    .on('change', browser.reload)
});

gulp.task('default', ['serve']);
