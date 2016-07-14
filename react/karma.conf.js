
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
webpackKarma.module.preLoaders = [
  {
    test: /\.js/, 
    loader: 'isparta',
    exclude: /(tests|node_modules)\//,
  }
];
webpackKarma.isparta = {
  embedSource: true,
  noAutoWrap: true,
  // these babel options will be passed only to isparta and not to babel-loader
  babel: {
    presets: ['es2015', 'react']
  }
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
      'src/test.webpack.js'
    ],
    preprocessors: {
      // these files we want to be precompiled with webpack
      // also run tests through sourcemap for easier debugging
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
