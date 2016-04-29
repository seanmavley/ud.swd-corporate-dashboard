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

// connect to browser-sync and reload
// upon changes to the html files
gulp.task('serve', function() {
    browser.init({ server: 'app/', port: port });
    gulp.watch('app/*.html').on('change', browser.reload);
});

// crank up the gears!
gulp.task('default', ['serve']);
