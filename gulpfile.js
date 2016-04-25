var gulp = require('gulp');
var browser = require('browser-sync').create();
var $ = require('gulp-load-plugins')();
var port = process.env.SERVER_PORT || 3000;

// connect to browser-sync and reload
// upon changes to the html files
gulp.task('serve', function() {
    browser.init({ server: 'app/', port: port });
    gulp.watch('app/*.html').on('change', browser.reload);
    gulp.watch('app/*.js').on('change', browser.reload);
});

// crank up the gears!
gulp.task('default', ['serve']);
