
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const precss = require('precss');

module.exports = {
    entry: {
      server: 'webpack-dev-server/client?http://localhost:8080', // WebpackDevServer host and port
      hot: 'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
      personal_data: './src/personal-data'
    },
    output: {
      path: path.join(__dirname, 'build'),
      publicPath: '/build/',
      filename: '[name]-bundle.dev.js'
    },
    devtool: 'source-map',
    resolve: {
      // allow us to import components in tests like:
      // import Example from 'components/Example';
      root: [
        path.join(__dirname, 'src')
      ],
      // allow us to avoid including extension name
      extensions: ['', '.js', '.jsx'],
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loaders: ['react-hot', 'babel-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.json$/,
          loader: 'json'
        },
        {
          test: /\.scss$/,
          loaders: ['style-loader', 'css-loader', 'postcss-loader']
        }
      ]
    },
    plugins:[
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin() 
    ],
    postcss: function () {
      return [autoprefixer, precss];
    }
};
