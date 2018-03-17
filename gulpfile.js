

//
//  GULP
//––––––––––––––––––––––––––––––––––––––––––––––––––

// General.
var gulp            = require('gulp');
var sass            = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');
var concat          = require('gulp-concat');
var uglify          = require('gulp-uglify');
var hash            = require('gulp-hash');
var del             = require('del');

var run             = require('run-sequence')
var newer           = require('gulp-newer');
var changed         = require('gulp-changed');

// Webpack.
var webpack         = require('webpack');
var webpackStream   = require('webpack-stream');
var webpackConfig   = require('./webpack.config.js');

// Dev only source maps.
var sourcemaps      = require('gulp-sourcemaps');
var argv            = require('yargs').argv;
var gulpif          = require('gulp-if');

// Images.
var responsive      = require('gulp-responsive');
var imagemin        = require('gulp-imagemin');
var mozjpeg         = require('imagemin-mozjpeg');


//
//  REACT
//––––––––––––––––––––––––––––––––––––––––––––––––––

gulp.task('react', function() {

  // If dev flag doesn't exist.
  if ( argv.dev === undefined ) {

    // Set dev flag to false.
    argv.dev = false;
  }

  // If this is not dev (i.e. production).
  if ( argv.dev ) {

    webpackConfig.plugins = [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"'
      })
    ];
  
  } else {

    webpackConfig.plugins = [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
      })
    ];
  }

  return webpackStream( webpackConfig )
    .on('error', function handleError() {
      this.emit('end'); // Recover from errors
    })
    .pipe( gulp.dest('static/js') );
});


//
//  SCSS
//––––––––––––––––––––––––––––––––––––––––––––––––––

// Compile admin SCSS files to CSS
gulp.task('scss', function () {

  // Clear the static/css directory.
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

  // Clear the static/js directory.
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
    .pipe( uglify().on('error', console.log) )
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

  // Copy and minify vendor JS files.
  gulp.src('src/js/vendor/*.js')
    .pipe( uglify().on('error', console.log) )
    .pipe( gulp.dest('static/js/vendor') );

});


//
//  IMAGES HASHMAP
//––––––––––––––––––––––––––––––––––––––––––––––––––

// gulp.task('images', function() {
//   // del(['static/img/**/*']);
//   gulp.src('src/img/**/*')
//     .pipe( hash() )
//     .pipe( gulp.dest('static/img') )

//     // Create a hash map.
//     .pipe( hash.manifest('hash.json'), {
//       deleteOld: true,
//       sourceDir: 'static/images'
//     })
//     // Put the map in the data directory.
//     .pipe( gulp.dest('data/images') );
// });


//
//  ADMIN SCSS
//––––––––––––––––––––––––––––––––––––––––––––––––––

// Compile admin SCSS files to CSS
// gulp.task('admin-scss', function () {
//   gulp.src('src/admin/scss/**/*.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(sass({outputStyle : 'expanded'}))
//     .pipe(autoprefixer({
//       browsers : ['last 20 versions']
//     }))
//     .pipe(gulp.dest('static/admin/css'));
// });


//
//  IMAGES
//––––––––––––––––––––––––––––––––––––––––––––––––––

gulp.task('images', function() {

  // Copy all images from /src to /static.
  gulp.src('src/img/uploads/**/*.{jpg,png,gif}')
    .pipe(gulp.dest('static/img/uploads'));

  
  // Low quality image placeholders (LQIP)
  gulp.src('src/img/uploads/**/*.{jpg,png}')    
    .pipe(responsive({
        '*': [
          {
            width: '100%',
            quality: 1,
            format: 'jpeg',
            rename: {
              suffix: '-lqip',
              extname: '.jpg',
            }
          }
        ],
      }, {
        silent: true // Don't spam the console
    }))
    .pipe(gulp.dest('static/img/uploads'));


  // Featured images.
  gulp.src('src/img/uploads/featured-image-*.{jpg,png}')
    // .pipe(newer("./static/uploads/"))
    .pipe(responsive({
      '*': [
        {
          width: '50%',
          rename: {
            suffix: '-sm'
          },
        }
        // }, {
          // width: '100%'
        // LQIP
        // }, {
        //   width: '100%',
        //   quality: 1,
        //   rename: {
        //     suffix: '-lqip'
        //   }
        // }
      ],
    }, {
      // quality: 100,
      // compressionLevel: 9,
      progressive: true,
      silent: true // Don't spam the console
    }))
    .pipe(gulp.dest('static/img/uploads'));
});


//
//  COMPRESS IMAGES
//––––––––––––––––––––––––––––––––––––––––––––––––––

// gulp.task('compress-images', ['images'], function() {
gulp.task('compress-images', function() {

  // All JPGs and PNGs except those with -lqip suffix.
  gulp.src([
    'static/img/uploads/**/*.{jpg,png}',
    '!static/img/uploads/**/*-lqip.jpg'
    ])
    // .pipe(newer('src/img/uploads/'))
    .pipe(imagemin([
      imagemin.gifsicle(),
      // imagemin.optipng({optimizationLevel: 9}),
      imagemin.optipng(),
      imagemin.svgo(),
      mozjpeg(),
    ]))
    .pipe(gulp.dest('static/img/uploads'));
});


//
//  BUILD
//––––––––––––––––––––––––––––––––––––––––––––––––––

// gulp.task('build', ['responsive-images', 'compress-images']);
// gulp.task('build', ['compress-images']);
// gulp.task('build', ['responsive-images']);


// gulp.task('build', ['responsive-images'], function(callback) {
//   run(['compress-images'], function() {
//     callback();
//   });
// });



//
//  WATCH
//––––––––––––––––––––––––––––––––––––––––––––––––––

// Watch asset folder for changes
gulp.task('watch', ['scss', 'js', 'react'], function () {
  gulp.watch('src/scss/**/*', ['scss']);
  // gulp.watch('src/admin/scss/**/*', ['admin-scss']);
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/react/**/*.js', ['react']);
});


//
//  DEFAULT
//––––––––––––––––––––––––––––––––––––––––––––––––––

// Set watch as default task
gulp.task('default', ['watch']);
