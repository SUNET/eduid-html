
var argv = require('yargs').argv;
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');

var webpackKarma = {
  resolve: webpackConfig.resolve,
  module: webpackConfig.module
};

webpackKarma.devtool = 'inline-source-map';
// required for enzyme to work properly
webpackKarma.resolve.alias = { 'sinon': 'sinon/pkg/sinon' };
webpackKarma.externals = {
      'cheerio': 'window',
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true
    };


module.exports = function (config) {
  config.set({
    browsers: [ 'Chrome' ], //run in Chrome

    // just run once by default unless --watch flag is passed
    //singleRun: !argv.watch,
    singleRun: false,
    autoWatch: true,

    // which karma frameworks do we want integrated
    frameworks: [ 'mocha', 'chai' ], //use the mocha test framework
    // files with tests
    files: [
      // XXX if we add the components as files, they are sent to the browser in alphabetical order,
      // XXX and the dependencies are wrong; and the browser complains that "no such file or  directory"
      // XXX for the missing dependencies.
      // XXX If we do not add them, coverage does not see them.
      // 'src/components/*.js',
      'src/test.webpack.js'
    ],
    preprocessors: {
      // these files we want to be precompiled with webpack
      // also run tests through sourcemap for easier debugging
      'src/components/*.js': [ 'webpack', 'sourcemap', 'coverage' ], //preprocess with webpack and our sourcemap loader
      'src/test.webpack.js': [ 'webpack', 'sourcemap' ] //preprocess with webpack and our sourcemap loader
    },
    reporters: [ 'progress', 'coverage' ], //report results in this format
    coverageReporter: {
      reporters: [
        { type: 'lcov', dir: 'coverage/'},
        { type: 'text' }
      ]
    },
    webpack: webpackKarma,
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },
    plugins: [
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-mocha',
      'karma-chai-lodash'
    ],
  });
};
