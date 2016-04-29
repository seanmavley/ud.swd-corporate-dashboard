var gulp = require('gulp'),
  browser = require('browser-sync').create(),
  $ = require('gulp-load-plugins')(),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify');

var port = process.env.SERVER_PORT || 3000;

//script paths
var jsFiles = 'app/scripts/**/*.js',  
    jsDest = 'app/build';

gulp.task('scripts', function() {  
    return gulp.src(jsFiles)
        .pipe(concat('corp.darshboard.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('corp.dashboard.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

gulp.task('serve', function() {
    browser.init({ server: 'app/', port: port });
    // watch and rebuild scripts
    gulp.watch('app/**/*.*', ['scripts'])
      .on('change', browser.reload);
});

gulp.task('default', ['serve']);
