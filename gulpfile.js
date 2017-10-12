//
//  GULP
//––––––––––––––––––––––––––––––––––––––––––––––––––

var gulp            = require('gulp');
var sass            = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');
var concat          = require('gulp-concat');
var uglify          = require('gulp-uglify');
var sourcemaps      = require('gulp-sourcemaps');
var hash            = require('gulp-hash');
var del             = require('del');



//
//  SCSS
//––––––––––––––––––––––––––––––––––––––––––––––––––

// Compile admin SCSS files to CSS
gulp.task('scss', function () {
  del(['static/css/**/*']);
  gulp.src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sass({outputStyle : 'contracted'}))
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(autoprefixer({
      browsers : ['last 20 versions']
    }))
    .pipe(hash())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('static/css'))

    // Create a hash map.
    .pipe(hash.manifest('hash.json'), {
      deleteOld: true,
      sourceDir: 'static/css'
    })
    // Put the map in the data directory.
    .pipe(gulp.dest('data/css'));
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
  del(['static/js/**/*']);
  gulp.src('src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(hash())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('static/js'))

    // Create a hash map.
    .pipe(hash.manifest('hash.json'), {
      deleteOld: true,
      sourceDir: 'static/js'
    })
    // Put the map in the data directory.
    .pipe(gulp.dest('data/js'));
});



//
//  IMAGES
//––––––––––––––––––––––––––––––––––––––––––––––––––

gulp.task('images', function() {
  // del(['static/img/**/*']);
  gulp.src('src/img/**/*')
    .pipe(hash())
    .pipe(gulp.dest('static/img'))

    // Create a hash map.
    .pipe(hash.manifest('hash.json'), {
      deleteOld: true,
      sourceDir: 'static/images'
    })
    // Put the map in the data directory.
    .pipe(gulp.dest('data/images'));
});


//
//  WATCH
//––––––––––––––––––––––––––––––––––––––––––––––––––

// Watch asset folder for changes
gulp.task('watch', ['scss', 'js'], function () {
  gulp.watch('src/scss/**/*', ['scss']);
  gulp.watch('src/admin/scss/**/*', ['admin-scss']);
  gulp.watch('src/js/**/*.js', ['js']);
});


//
//  DEFAULT
//––––––––––––––––––––––––––––––––––––––––––––––––––

// Set watch as default task
gulp.task('default', ['watch']);
