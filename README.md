[https://glennmccomb.com](https://glennmccomb.com)

## Tech stack

Built using [Hugo](https://gohugo.io/). Content is managed via [Netlify CMS](https://www.netlifycms.org/). Hosted on [Netlify](https://www.netlify.com/).

Gulp is used to:

- Compile SCSS into CSS and append a hash to file names.
- Compile and minify vanilla JavaScript and append a hash to file names.
- Create low-quality-image-placeholders ([LQIP](https://www.guypo.com/introducing-lqip-low-quality-image-placeholders)) while page is loading.
- Compress images.
- Create critical CSS for key pages.

Webpack is used to:

- Compile React.
- Compile lambda functions.

Comments are manage via [Disqus](https://disqus.com/) and are lazy-loaded using [disqusLoader](https://github.com/osvaldasvalutis/disqusLoader.js/) which you can learn about in [this CSS Tricks article](https://css-tricks.com/lazy-loading-disqus-comments/).

## Node

Recommended Node version is 20.17.0.

This needs to be managed in Netlify as an environment variable at `Site Configuration -> Environment variables -> NODE_VERSION`.

## Hugo

This codebase is currently optimised for Hugo v0.120.1. Hugo is installed and managed by Brew.

Useful commands: 

`$ hugo server` to run a local environment. Runs at http://localhost:1313/ by default.

`$ hugo version` to check current Hugo version.

To install the specific version of Hugo which this codebase is optimised for, use `$ brew install hugo.rb`.

### Upgrading

To update hugo I use `$ brew upgrade hugo` which updates to the latest release. Hugo also needs to be updated in Netlify in `Settings -> Build & deploy -> Environment -> Environment variables -> HUGO_VERSION`.

## Gulp

Useful commands:

`$ gulp` to watch SCSS and JavaScript files.

`$ gulp images` to create responsive sizes of featured images and to generate LQIP images.

`$ gulp compressImages` to run additional compression on images.

`$ gulp criticalCss` to generate critical CSS for key pages.

### Dependencies

In order to build responsive images using `gulp-responsive`, `libvips` must be installed (which includes `sharp`). On macOS this can be done via `brew install vips`. Last tested working with `vips-8.15.3`.

## Webpack

Webpack is run using NPM scripts:

`$ npm start` to create a development build and start watching files in `/src/react/`.

`$ npm run build` to create a production build (without watch).

## General notes

### Page header images

Page header featured images are saved as plain JPG / PNGs in Photoshop with `featured-image-` prefix in `/src/img/uploads/`. These then need to be processed with `gulp images` and `gulp compress-images`, after which point they are compressed and copied to `static/img/uploads/`. In generaly, these images are 1400 x 700, but it doesn't particularly matter since they are scaled to fit wherever they're displayed (in article summary tiles and in page headers).

### Photography images

Photography images should have their widest side set to 1600 pixels. They are set up as [Hugo Page Resources](https://gohugo.io/content-management/page-resources/) and use [Hugo Image Processing](https://gohugo.io/content-management/page-resources/). They are co-located with photography items and described in the photography.md's frontmatter. 

If image quality of image dimensions are adjusted, they are automatically regenerated and added to the `/resources/_gen/images/photography/post-name/image-name-hash.jpg`. It's important to note that old images are *not* removed during this process and they must be manually cleaned up with `$ hugo --gc`, which is Hugo's garbage collection.