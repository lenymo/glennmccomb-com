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
var argv            = require('yargs').argv;
var gulpif          = require('gulp-if');


//
//  SCSS
//––––––––––––––––––––––––––––––––––––––––––––––––––

// Compile admin SCSS files to CSS
gulp.task('scss', function () {
  del(['static/css/**/*']);

  // If dev flag doesn't exist.
  if ( argv.dev === undefined ) {

    // Set dev flag to false.
    argv.dev = false;
  }

  gulp.src('src/scss/**/*.scss')

    // Initialise source maps for dev.
    .pipe( gulpif( argv.dev, sourcemaps.init() ) )
    .pipe( sass().on('error', sass.logError) )
    .pipe( sass({outputStyle : 'compressed'}) )
    .pipe( gulpif( argv.dev, sourcemaps.write({includeContent: false}) ) )
    .pipe( gulpif( argv.dev, sourcemaps.init({loadMaps: true}) ) )
    .pipe( autoprefixer({
      browsers : ['last 20 versions']
    }))
    .pipe( hash() )
    .pipe( gulpif( argv.dev, sourcemaps.write() ) )
    .pipe( gulp.dest('static/css') )

    // Create a hash map.
    .pipe( hash.manifest('hash.json'), {
      deleteOld: true,
      sourceDir: 'static/css'
    })
    // Put the map in the data directory.
    .pipe( gulp.dest('data/css') );

});


//
//  JAVASCRIPT
//––––––––––––––––––––––––––––––––––––––––––––––––––

gulp.task('js', function() {
  del(['static/js/**/*']);


  // If dev flag doesn't exist.
  if ( argv.dev === undefined ) {

    // Set dev flag to false.
    argv.dev = false;
  }


  gulp.src('src/js/*.js')

    // Initialise source maps for dev.
    .pipe( gulpif( argv.dev, sourcemaps.init() ) )
    .pipe( concat('main.min.js') )
    .pipe( uglify() )
    .pipe( hash() )
    .pipe( gulpif( argv.dev, sourcemaps.write('./') ) )
    .pipe( gulp.dest('static/js') )

    // Create a hash map.
    .pipe( hash.manifest('hash.json'), {
      deleteOld: true,
      sourceDir: 'static/js'
    })
    // Put the map in the data directory.
    .pipe( gulp.dest('data/js') );

});


//
//  IMAGES
//––––––––––––––––––––––––––––––––––––––––––––––––––

gulp.task('images', function() {
  // del(['static/img/**/*']);
  gulp.src('src/img/**/*')
    .pipe( hash() )
    .pipe( gulp.dest('static/img') )

    // Create a hash map.
    .pipe( hash.manifest('hash.json'), {
      deleteOld: true,
      sourceDir: 'static/images'
    })
    // Put the map in the data directory.
    .pipe( gulp.dest('data/images') );
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
