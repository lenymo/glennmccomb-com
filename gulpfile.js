

//
//  GULP
//––––––––––––––––––––––––––––––––––––––––––––––––––

// General.
var gulp            = require('gulp');
var sass            = require('gulp-sass');
var exec            = require('child_process').exec;
var critical        = require('critical').stream;
var autoprefixer    = require('gulp-autoprefixer');
var concat          = require('gulp-concat');
var uglify          = require('gulp-uglify');
var hash            = require('gulp-hash');
var del             = require('del');

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

// Data.
var hashCSS         = require('./data/css/hash.json');


//
//  REACT
//––––––––––––––––––––––––––––––––––––––––––––––––––

gulp.task('react', function() {

  // If dev flag doesn't exist.
  if ( argv.dev === undefined ) {

    // Set dev flag to false.
    argv.dev = false;
  }

  // If this is DEV.
  if ( argv.dev ) {

    webpackConfig.plugins = [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"'
      })
    ];
  
    return webpackStream( webpackConfig )
      .on('error', function handleError() {
        this.emit('end'); // Recover from errors
      })
      .pipe( gulp.dest('static/js') );

  // If this is NOT dev (i.e. production).
  } else {

    // webpackConfig.plugins = [
    //   new webpack.DefinePlugin({
    //     'process.env.NODE_ENV': '"production"'
    //   })
    // ];
  }

});


//
//  SCSS
//––––––––––––––––––––––––––––––––––––––––––––––––––

// Compile admin SCSS files to CSS
gulp.task('scss', function () {

  // Clear the static/css directory.
  del([
    'static/css/*.css',
    '!static/css/critical/**/*',
  ]);

  // If dev flag doesn't exist.
  if ( argv.dev === undefined ) {

    // Set dev flag to false.
    argv.dev = false;
  }

  gulp.src('src/scss/**/*.scss')

    // Initialise source maps for dev.
    .pipe( gulpif( argv.dev, sourcemaps.init() ) )
    .pipe( sass().on('error', sass.logError) )
    .pipe( sass({outputStyle: 'compressed'}) )
    .pipe( gulpif( argv.dev, sourcemaps.write({includeContent: false}) ) )
    .pipe( gulpif( argv.dev, sourcemaps.init({loadMaps: true}) ) )
    .pipe( autoprefixer({
      browsers: [
        'last 5 version',
        '> 50%',
        'Firefox < 20',
        'safari 5',
        'ie 8-11',
        'android >=2.1'
      ],
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
  del([
    'static/js/**/*',
    '!static/js/bundle.js'
  ]);

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
//  IMAGES
//––––––––––––––––––––––––––––––––––––––––––––––––––

gulp.task('images', function() {

  // Clear the /static/img/uploads/ directory.
  del(['static/img/uploads/**/*']);

  // Copy all images from /src to /static.
  gulp.src('src/img/uploads/**/*.{jpg,png,gif}')
    .pipe(gulp.dest('static/img/uploads'));
  
  // LQIP (low quality image placeholders) for all JPG and PNGs.
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
    .pipe(responsive({
      '*': [
        {
          width: '50%',
          rename: {
            suffix: '-sm'
          },
        }
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
    .pipe(imagemin([
      imagemin.gifsicle(),
      // imagemin.optipng({optimizationLevel: 9}),
      imagemin.optipng(),
      imagemin.svgo(),
      mozjpeg(),
    ]))
    .pipe(gulp.dest('static/img/uploads'));

  // Further LQIP images.
  gulp.src('!static/img/uploads/**/*-lqip.jpg')
    .pipe(imagemin([
      imagemin.gifsicle(),
      // imagemin.optipng({optimizationLevel: 9}),
      imagemin.optipng(),
      imagemin.svgo(),
      mozjpeg({quality:2})
    ]))
    .pipe(gulp.dest('static/img/uploads'));
});


//
//  CRITICAL CSS
//––––––––––––––––––––––––––––––––––––––––––––––––––

// Generate & Inline Critical-path CSS
gulp.task('critical', function (cb) {

  var path = 'static/css/';

  // Build CSS filename paths.
  var main = path + hashCSS['main.css'];
  var article = path + hashCSS['single-article.css'];
  var contact = path + hashCSS['contact.css'];
  var about = path + hashCSS['about.css'];

  exec('hugo', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });

  // Wait until Hugo has finished building.
  setTimeout(function() {

    // Home page / article listing.
    gulp.src('public/articles/index.html')
      .pipe(critical({
        base: '/',
        minify: true,
        css: [main],
        width: 1200,
        height: 900,
      }))
      .on('error', function(err) { console.log(err.message); })
      .pipe(gulp.dest('static/css/critical/'));


    // Single article.
    gulp.src('public/articles/a-better-nba-box-score/index.html')
      .pipe(critical({
        base: '/',
        minify: true,
        css: [main, article],
        width: 1200,
        height: 600,
      }))
      .on('error', function(err) { console.log(err.message); })
      .pipe(gulp.dest('static/css/critical/articles/'));

    // Contact page.
    gulp.src('public/contact/index.html')
      .pipe(critical({
        base: '/',
        minify: true,
        css: [main, contact],
        width: 1200,
        height: 1200,
      }))
      .on('error', function(err) { console.log(err.message); })
      .pipe(gulp.dest('static/css/critical/contact/'));

    // About page.
    gulp.src('public/about/index.html')
      .pipe(critical({
        base: '/',
        minify: true,
        css: [main, about],
        width: 1200,
        height: 1200,
      }))
      .on('error', function (err) { console.log(err.message); })
      .pipe(gulp.dest('static/css/critical/about/'));
  }, 1000);

});



//
//  WATCH
//––––––––––––––––––––––––––––––––––––––––––––––––––

// Watch asset folder for changes
gulp.task('watch', ['scss', 'js', 'react'], function () {
  gulp.watch('src/scss/**/*', ['scss']);
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/img/uploads/**/*', ['images']);
  gulp.watch('src/react/**/*.js', ['react']);
});


//
//  DEFAULT
//––––––––––––––––––––––––––––––––––––––––––––––––––

// Set watch as default task
gulp.task('default', ['watch']);
