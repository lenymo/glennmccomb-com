//
//  GULP
//––––––––––––––––––––––––––––––––––––––––––––––––––

// General.
import gulp from "gulp";
const { dest, src, series, watch } = gulp;
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);
import { exec } from "child_process";
import { stream as critical } from "critical";
import autoprefixer from "gulp-autoprefixer";
import hash from "gulp-hash";
import del from "del";

// Images.
import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

// Data.
import hashCSS from "./data/css/hash.json" assert { type: "json" };

// Rollup
import { rollup } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import rollupSourcemaps from "rollup-plugin-sourcemaps";
import { createHash } from "crypto";

//
//  SCSS
//––––––––––––––––––––––––––––––––––––––––––––––––––

// Compile admin SCSS files to CSS
function compileScss() {
  // Clear the static/css directory.
  del(["static/css/*.css", "!static/css/critical/**/*"]);

  return (
    src("src/scss/**/*.scss")
      // Initialise source maps for dev.
      .pipe(
        sass
          // Render synchronously which is x2 faster according to gulp-sass docs
          .sync({ outputStyle: "compressed" })
          .on("error", sass.logError)
      )
      .pipe(
        autoprefixer({
          browsers: [
            "last 5 version",
            "> 50%",
            "Firefox < 20",
            "safari 5",
            "ie 8-11",
            "android >=2.1",
          ],
        })
      )
      .pipe(hash())
      .pipe(dest("static/css"))

      // Create a hash map.
      .pipe(hash.manifest("hash.json"), {
        deleteOld: true,
        sourceDir: "static/css",
      })
      // Put the map in the data directory.
      .pipe(dest("data/css"))
  );
}

//
//  JAVASCRIPT
//––––––––––––––––––––––––––––––––––––––––––––––––––

async function compileJs() {
  // Clear the static/js directory
  await del(["static/js/**/*"]);

  const dev = process.argv.includes("--dev");

  const bundle = await rollup({
    input: "src/js/main.js", // Main entry point
    plugins: [
      resolve(),
      commonjs(),
      dev && rollupSourcemaps(),
      !dev && terser(),
    ].filter(Boolean),
  });

  const { output } = await bundle.generate({
    file: "static/js/bundle.js",
    format: "es", // Use ES module format
    sourcemap: dev,
  });

  const { code, map } = output[0];

  // Generate hash
  const hash = createHash("md5").update(code).digest("hex").slice(0, 8);
  const fileName = `main.${hash}.min.js`;

  // Write bundle
  await fs.mkdir("static/js", { recursive: true });
  await fs.writeFile(`static/js/${fileName}`, code);
  if (dev) {
    await fs.writeFile(`static/js/${fileName}.map`, map.toString());
  }

  // Update hash manifest
  const manifest = { "main.min.js": fileName };
  await fs.writeFile("data/js/hash.json", JSON.stringify(manifest, null, 2));

  // Copy and minify vendor JS files.
  return src("src/js/vendor/*.js").pipe(dest("static/js/vendor"));
}

//
//  IMAGES
//––––––––––––––––––––––––––––––––––––––––––––––––––

async function images() {
  // Clear the /static/img/uploads/ directory.
  await del(["static/img/uploads/**/*"]);

  // Process images
  const srcDir = "src/img/uploads";
  const destDir = "static/img/uploads";

  const files = await fs.readdir(srcDir);

  for (const file of files) {
    // Only look for jpg and png.
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      const srcPath = path.join(srcDir, file);
      const destPath = path.join(destDir, file);

      try {
        // Create low quality image placeholders of all JPG and PNG images
        await sharp(srcPath)
          .jpeg({ quality: 1, mozjpeg: true })
          .toFile(path.join(destDir, `${path.parse(file).name}-lqip.jpg`));

        // Featured images
        if (file.startsWith("featured-image-")) {
          const metadata = await sharp(srcPath).metadata();
          await sharp(srcPath)
            .resize({ width: Math.floor(metadata.width / 2) })
            .jpeg({ quality: 60 })
            .toFile(path.join(destDir, `${path.parse(file).name}-sm.jpg`));
        }

        // Compress JPGs without scaling
        if (
          file.endsWith(".jpg") &&
          !file.endsWith("-lqip.jpg") &&
          !file.endsWith("-sm.jpg")
        ) {
          // await fs.copyFile(srcPath, destPath);
          await sharp(srcPath)
            .jpeg({ quality: 60 })
            .toFile(
              path.join(
                destDir,
                `${path.parse(file).name}${path.parse(file).ext}`
              )
            );

          // Compress PNGs without scaling
        } else if (file.endsWith(".png")) {
          await sharp(srcPath)
            .png({ quality: 60 })
            .toFile(
              path.join(
                destDir,
                `${path.parse(file).name}${path.parse(file).ext}`
              )
            );
        }
      } catch (error) {
        console.error(`Error processing ${file}:`, error);
      }
    }
  }
}

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

  exec("hugo", function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });

  // How long to wait for Hugo to build.
  const buildWait = 1000;

  // Wait until Hugo has finished building.
  setTimeout(function () {
    // Home page / article listing.
    src("public/articles/index.html")
      .pipe(
        critical({
          base: "/",
          css: [main],
          width: 1200,
          height: 900,
        })
      )
      .on("error", function (err) {
        console.log(err.message);
      })
      .pipe(dest("static/css/critical/"));

    // Single article.
    src("public/articles/a-better-nba-box-score/index.html")
      .pipe(
        critical({
          base: "/",
          css: [main, article],
          width: 1200,
          height: 600,
        })
      )
      .on("error", function (err) {
        console.log(err.message);
      })
      .pipe(dest("static/css/critical/articles/"));

    // Contact page.
    src("public/contact/index.html")
      .pipe(
        critical({
          base: "/",
          css: [main, contact],
          width: 1200,
          height: 1200,
        })
      )
      .on("error", function (err) {
        console.log(err.message);
      })
      .pipe(dest("static/css/critical/contact/"));

    // About page.
    src("public/about/index.html")
      .pipe(
        critical({
          base: "/",
          css: [main, about],
          width: 1200,
          height: 1200,
        })
      )
      .on("error", function (err) {
        console.log(err.message);
      })
      .pipe(dest("static/css/critical/about/"));

    // Photography index.
    src("public/photography/index.html")
      .pipe(
        critical({
          base: "/",
          css: [main, photography],
          width: 1200,
          height: 1200,
        })
      )
      .on("error", function (err) {
        console.log(err.message);
      })
      .pipe(dest("static/css/critical/photography/"));

    // Single photography.
    src("public/photography/brunswick-wall-flowers/index.html")
      .pipe(
        critical({
          base: "/",
          css: [main, singlePhotography],
          width: 1200,
          height: 1200,
        })
      )
      .on("error", function (err) {
        console.log(err.message);
      })
      .pipe(dest("static/css/critical/single-photography/"));
  }, buildWait);
}

//
//  WATCH
//––––––––––––––––––––––––––––––––––––––––––––––––––

function watchFiles() {
  watch("src/scss/**/*", compileScss);
  watch("src/js/**/*", compileJs);
  watch("src/img/uploads/**/*", images);
}

//
//  EXPORTS
//––––––––––––––––––––––––––––––––––––––––––––––––––

export { compileScss, compileJs, images, criticalCss };

export default series(compileJs, compileScss, watchFiles);
