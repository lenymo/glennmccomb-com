

//
//  GULP
//––––––––––––––––––––––––––––––––––––––––––––––––––

// General.
var gulp            = require('gulp');
var sass            = require('gulp-sass');
var critical        = require('critical').stream;
var hashCSS         = require('./data/css/hash.json');
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
var sqip            = require('gulp-sqip');

// Unused plugins.
// Used to run tasks in sequence. I couldn't get it working.
var run             = require('run-sequence');

// Both of these are used to determine if files are newer / have changed.
var newer           = require('gulp-newer');
var changed         = require('gulp-changed');


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

  // SQIP.
  // gulp.src('src/img/uploads/**/*.{jpg,png}')
  //   .pipe(sqip())
  //   .pipe(gulp.dest('static/img/uploads'));

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
    // .pipe(newer('src/img/uploads/'))
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
gulp.task('critical', function () {

  var path = 'static/css/';

  // Build CSS filename paths.
  var main = path + hashCSS['main.css'];
  var article = path + hashCSS['single-article.css'];

  // Home page.
  gulp.src([
    'public/articles/index.html',
    // 'public/articles/a-better-nba-box-score/index.html'
  ])
    .pipe(critical({
      base: '/',
      // inline: true,
      minify: true,
      css: [main],
      width: 1000,
      height: 600,
      // src: 'public/index.html';
    }))
    .on('error', function(err) { console.log(err.message); })
    .pipe(gulp.dest('static/css/critical'));


  // Article page.
  gulp.src([
    // 'public/index.html',
    'public/articles/a-better-nba-box-score/index.html'
  ])
    .pipe(critical({
      base: '/',
      minify: true,
      css: [main, article],
      width: 1000,
      height: 600,
    }))
    .on('error', function(err) { console.log(err.message); })
    .pipe(gulp.dest('static/css/critical/articles/'));
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
  gulp.watch('src/img/uploads/**/*', ['images']);
  gulp.watch('src/react/**/*.js', ['react']);
});


//
//  DEFAULT
//––––––––––––––––––––––––––––––––––––––––––––––––––

// Set watch as default task
gulp.task('default', ['watch']);
