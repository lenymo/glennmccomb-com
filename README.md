## GlennMcComb.com

[https://glennmccomb.com](https://glennmccomb.com)

### Tech stack

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

### Hugo

This codebase is currently optimised for Hugo v0.31.

Useful commands: 

`$ hugo server` to run a local environment. Runs at http://localhost:1313/ by default.

`$ hugo version` to check current Hugo version.

### Gulp

Useful commands:

`$ gulp` to watch SCSS and JavaScript files.

`$ gulp images` to create responsive sizes of featured images and to generate LQIP images.

`$ gulp compress-images` to run additional compression on images.

`$ gulp critical` to generate critical CSS for key pages.

### Webpack

Webpack is run using NPM scripts:

`$ npm start` to create a development build and start watching files in `/src/react/`.

`$ npm run build` to create a production build (without watch).