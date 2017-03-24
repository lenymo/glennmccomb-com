var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// Compile SCSS files to CSS
gulp.task('scss', function () {
  gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(sass({outputStyle : 'expanded'}))
    .pipe(autoprefixer({
      browsers : ['last 20 versions']
    }))
    .pipe(gulp.dest('static/css'));
});

// Watch asset folder for changes
gulp.task('watch', ['scss'], function () {
  gulp.watch('src/scss/**/*', ['scss']);
});

// Set watch as default task
gulp.task('default', ['watch']);