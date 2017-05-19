//
//  GULP
//––––––––––––––––––––––––––––––––––––––––––––––––––

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');


//
//  SCSS
//––––––––––––––––––––––––––––––––––––––––––––––––––

// Compile admin SCSS files to CSS
gulp.task('scss', function () {
  gulp.src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sass({outputStyle : 'expanded'}))
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(autoprefixer({
      browsers : ['last 20 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('static/css'));
});


//
//  ADMIN SCSS
//––––––––––––––––––––––––––––––––––––––––––––––––––

// Compile admin SCSS files to CSS
gulp.task('admin-scss', function () {
  gulp.src('src/admin/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(sass({outputStyle : 'expanded'}))
    .pipe(autoprefixer({
      browsers : ['last 20 versions']
    }))
    .pipe(gulp.dest('static/admin/css'));
});


//
//  JAVASCRIPT
//––––––––––––––––––––––––––––––––––––––––––––––––––

gulp.task('js', function() {
  gulp.src('src/js/main.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('static/js'));
});



//
//  IMAGES
//––––––––––––––––––––––––––––––––––––––––––––––––––

gulp.task('images', function() {
  // del(['static/img/**/*']);
  gulp.src('src/img/**/*')
    // .pipe(hash())
    .pipe(gulp.dest('static/img'));
    // .pipe(hash.manifest('hash.json')
    // .pipe(gulp.dest('data/images');
});


//
//  WATCH
//––––––––––––––––––––––––––––––––––––––––––––––––––

// Watch asset folder for changes
gulp.task('watch', ['scss', 'admin-scss'], function () {
  gulp.watch('src/scss/**/*', ['scss']);
  gulp.watch('src/admin/scss/**/*', ['admin-scss']);
  gulp.watch('src/js/main.js', ['js']);
});


//
//  DEFAULT
//––––––––––––––––––––––––––––––––––––––––––––––––––

// Set watch as default task
gulp.task('default', ['watch']);
