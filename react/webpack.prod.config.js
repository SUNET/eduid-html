
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

var webpackProd = {
  entry: webpackConfig.entry,
  output: webpackConfig.output,
  resolve: webpackConfig.resolve,
  module: webpackConfig.module
};

webpackProd.output.filename = '[name]-bundle.prod.js';

webpackProd.plugins = [
  new webpack.DefinePlugin({
    'process.env':{
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(true),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
      output: {
      comments: false,
    },
  })
];

module.exports = webpackProd;
