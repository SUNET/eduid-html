
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

var webpackProd = {
  entry: webpackConfig.entry,
  resolve: webpackConfig.resolve,
  module: webpackConfig.module
};

delete webpackProd.entry.server;
delete webpackProd.entry.hot;

webpackProd.devtool = 'inline-source-map';

webpackProd.output = {
  filename: '[name].js',
  publicPath: '/static/build/',
  path: path.join(__dirname, 'build')
}

webpackProd.plugins = [
  new webpack.DefinePlugin({
    'process.env':{
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.ProvidePlugin({
    'Promise': 'exports?global.Promise!es6-promise',
    'window.fetch': 'exports?self.fetch!whatwg-fetch'
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
