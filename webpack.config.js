const path = require('path');
var webpack = require('webpack');

var ENV = process.env.NODE_ENV;

const baseConfig = {
  entry: {
    bundle: './src/react/index.js'
  },
  output: {
    path: path.resolve(__dirname, './static/js'),
    filename: '[name].js'
  },
  // watch: true,
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV)
    })
  ]
};


// If the environment is development.
if (ENV === 'development') {

  // Source maps.
  // https://webpack.js.org/configuration/devtool/
  baseConfig.devtool = 'eval';

  // Watch.
  baseConfig.watch = true;
}

// If the environment is production.
if (ENV === 'production') {

  // Watch.
  baseConfig.watch = true;

  // Push a new item to the plugins array.
  baseConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

// Export configuration.
module.exports = baseConfig;