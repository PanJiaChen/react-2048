var gulp = require('gulp');
var react = require('gulp-react');

var scripts = 'public/scripts/*.js';

gulp.task('jsx', function() {
    return gulp.src(scripts)
        .pipe(react())
        .pipe(gulp.dest('built'));
});

gulp.task('watch', function() {
    gulp.watch(scripts, ['jsx']);
});

gulp.task('default', ['watch', 'jsx']);

gulp.task('build', ['jsx']);
