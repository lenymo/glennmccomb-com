//
//  GULP
//––––––––––––––––––––––––––––––––––––––––––––––––––

// General.
const { dest, src, series, watch } = require("gulp");
const sass = require("gulp-sass");
const exec = require("child_process").exec;
const critical = require('critical');
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const hash = require("gulp-hash");
const del = require("del");

// Dev only source maps.
const sourcemaps = require("gulp-sourcemaps");
const argv = require("yargs").argv;
const gulpif = require("gulp-if");

// Images.
const responsive = require("gulp-responsive");
const imagemin = require("gulp-imagemin");
const mozjpeg = require("imagemin-mozjpeg");

// Data.
const hashCSS = require("./data/css/hash.json");

//
//  SCSS
//––––––––––––––––––––––––––––––––––––––––––––––––––

// Compile admin SCSS files to CSS
function compileScss() {
  // Clear the static/css directory.
  del(["static/css/*.css", "!static/css/critical/**/*"]);

  // If dev flag doesn't exist.
  if (argv.dev === undefined) {
    // Set dev flag to false.
    argv.dev = false;
  }

  return src("src/scss/**/*.scss")
    // Initialise source maps for dev.
    .pipe(gulpif(argv.dev, sourcemaps.init()))
    .pipe(sass().on("error", sass.logError))
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(gulpif(argv.dev, sourcemaps.write({ includeContent: false })))
    .pipe(gulpif(argv.dev, sourcemaps.init({ loadMaps: true })))
    .pipe(
      autoprefixer({
        browsers: [
          "last 5 version",
          "> 50%",
          "Firefox < 20",
          "safari 5",
          "ie 8-11",
          "android >=2.1"
        ]
      })
    )
    .pipe(hash())
    .pipe(gulpif(argv.dev, sourcemaps.write()))
    .pipe(dest("static/css"))

    // Create a hash map.
    .pipe(
      hash.manifest("hash.json"),
      {
        deleteOld: true,
        sourceDir: "static/css"
      }
    )
    // Put the map in the data directory.
    .pipe(dest("data/css"));
}

//
//  JAVASCRIPT
//––––––––––––––––––––––––––––––––––––––––––––––––––

function compileJs() {
  // Clear the static/js directory.
  del(["static/js/**/*", "!static/js/bundle.js"]);

  // If dev flag doesn't exist.
  if (argv.dev === undefined) {
    // Set dev flag to false.
    argv.dev = false;
  }

  src("src/js/*.js")

    // Initialise source maps for dev.
    .pipe(gulpif(argv.dev, sourcemaps.init()))
    .pipe(concat("main.min.js"))
    .pipe(uglify().on("error", console.log))
    .pipe(hash())
    .pipe(gulpif(argv.dev, sourcemaps.write("./")))
    .pipe(dest("static/js"))

    // Create a hash map.
    .pipe(
      hash.manifest("hash.json"),
      {
        deleteOld: true,
        sourceDir: "static/js"
      }
    )
    // Put the map in the data directory.
    .pipe(dest("data/js"));

  // Copy and minify vendor JS files.
  return src("src/js/vendor/*.js")
    .pipe(uglify().on("error", console.log))
    .pipe(dest("static/js/vendor"));
}

//
//  IMAGES
//––––––––––––––––––––––––––––––––––––––––––––––––––

function images() {
  // Clear the /static/img/uploads/ directory.
  del(["static/img/uploads/**/*"]);

  // Copy all images from /src to /static.
  src("src/img/uploads/**/*.{jpg,jpeg,png,gif}")
    .pipe(dest("static/img/uploads"));
  ``;

  // LQIP (low quality image placeholders) for all JPG and PNGs.
  src("src/img/uploads/**/*.{jpg,jpeg,png}")
    .pipe(
      responsive(
        {
          "*": [
            {
              width: "100%",
              quality: 1,
              format: "jpg",
              rename: {
                suffix: "-lqip",
                extname: ".jpg"
              }
            }
          ]
        },
        {
          silent: true // Don't spam the console
        }
      )
    )
    .pipe(dest("static/img/uploads"));

  // Featured images.
  return src("src/img/uploads/featured-image-*.{jpg,jpeg,png}")
    .pipe(
      responsive(
        {
          "*": [
            {
              width: "50%",
              rename: {
                suffix: "-sm"
              },
              format: "jpg"
            }
          ]
        },
        {
          // quality: 100,
          // compressionLevel: 9,
          progressive: true,
          silent: true // Don't spam the console
        }
      )
    )
    .pipe(dest("static/img/uploads"));
};

//
//  COMPRESS IMAGES
//––––––––––––––––––––––––––––––––––––––––––––––––––

function compressImages() {
  // All JPGs and PNGs except those with -lqip suffix.
    src([
      "static/img/uploads/**/*.{jpg,jpeg,png}",
      "!static/img/uploads/**/*-lqip.jpg"
    ])
    .pipe(
      imagemin([
        imagemin.gifsicle(),
        // imagemin.optipng({optimizationLevel: 9}),
        imagemin.optipng(),
        imagemin.svgo(),
        mozjpeg()
      ])
    )
    .pipe(dest("static/img/uploads"));

  // Further LQIP images.
  return src("static/img/uploads/**/*-lqip.jpg")
    .pipe(
      imagemin([
        imagemin.gifsicle(),
        // imagemin.optipng({optimizationLevel: 9}),
        imagemin.optipng(),
        imagemin.svgo(),
        mozjpeg({ quality: 2 })
      ])
    )
    .pipe(dest("static/img/uploads"));
};

//
//  CRITICAL CSS
//––––––––––––––––––––––––––––––––––––––––––––––––––

// Generate & Inline Critical-path CSS
function criticalCss(cb) {
  var path = "static/css/";

  // Build CSS filename paths.
  var main = path + hashCSS["main.css"];
  var article = path + hashCSS["single-article.css"];
  var contact = path + hashCSS["contact.css"];
  var about = path + hashCSS["about.css"];
  var photography = path + hashCSS["photography.css"];
  var singlePhotography = path + hashCSS["single-photography.css"];

  exec("hugo", function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });

  // Wait until Hugo has finished building.
  setTimeout(function() {
    // Home page / article listing.
    src("public/articles/index.html")
      .pipe(
        critical({
          base: "/",
          minify: true,
          css: [main],
          width: 1200,
          height: 900
        })
      )
      .on("error", function(err) {
        console.log(err.message);
      })
      .pipe(dest("static/css/critical/"));

    // Single article.
    src("public/articles/a-better-nba-box-score/index.html")
      .pipe(
        critical({
          base: "/",
          minify: true,
          css: [main, article],
          width: 1200,
          height: 600
        })
      )
      .on("error", function(err) {
        console.log(err.message);
      })
      .pipe(dest("static/css/critical/articles/"));

    // Contact page.
    src("public/contact/index.html")
      .pipe(
        critical({
          base: "/",
          minify: true,
          css: [main, contact],
          width: 1200,
          height: 1200
        })
      )
      .on("error", function(err) {
        console.log(err.message);
      })
      .pipe(dest("static/css/critical/contact/"));

    // About page.
    src("public/about/index.html")
      .pipe(
        critical({
          base: "/",
          minify: true,
          css: [main, about],
          width: 1200,
          height: 1200
        })
      )
      .on("error", function(err) {
        console.log(err.message);
      })
      .pipe(dest("static/css/critical/about/"));

    // Photography index.
    src("public/photography/index.html")
      .pipe(
        critical({
          base: "/",
          minify: true,
          css: [main, photography],
          width: 1200,
          height: 1200
        })
      )
      .on("error", function(err) {
        console.log(err.message);
      })
      .pipe(dest("static/css/critical/photography/"));

    // Single photography.
    src("public/photography/brunswick-wall-flowers/index.html")
      .pipe(
        critical({
          base: "/",
          minify: true,
          css: [main, singlePhotography],
          width: 1200,
          height: 1200
        })
      )
      .on("error", function(err) {
        console.log(err.message);
      })
      .pipe(dest("static/css/critical/single-photography/"));
  }, 1000);
};

//
//  WATCH
//––––––––––––––––––––––––––––––––––––––––––––––––––

function watchFiles() {
  watch("src/scss/**/*", compileScss);
  watch("src/extension/js/main.js", compileJs);
  watch("src/img/uploads/**/*", images);
}

//
//  EXPORTS
//––––––––––––––––––––––––––––––––––––––––––––––––––

exports.compileScss = compileScss;
exports.compileJs = compileJs;
exports.images = images;
exports.compressImages = compressImages;
exports.criticalCss = criticalCss;

exports.watch = series(compileJs, compileScss, watchFiles);
exports.default = series(
  compileJs,
  compileScss,
  watchFiles
);
