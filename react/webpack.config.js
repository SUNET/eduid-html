
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const precss = require('precss');

module.exports = {
    entry: {
      server: 'webpack-dev-server/client?http://localhost:8080', // WebpackDevServer host and port
      hot: 'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
      personal_data: './src/entry-points/personal-data',
      dashboard: './src/entry-points/dashboard-tabbed-form'
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
      extensions: ['', '.js', '.jsx', '.json'],
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
          loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass']
        },
        {
          test: /\.css$/,
          loader: "style-loader!css-loader"
        },
        { 
          test: /\.png$/, 
          loader: "url-loader?limit=100000" 
        },
        { 
          test: /\.jpg$/, 
          loader: "file-loader" 
        },
        {
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
          loader: 'url?limit=10000&mimetype=application/font-woff'
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
          loader: 'url?limit=10000&mimetype=application/octet-stream'
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
          loader: 'file'
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
          loader: 'url?limit=10000&mimetype=image/svg+xml'
        }
      ]
    },
    plugins:[
      new webpack.HotModuleReplacementPlugin(),
      new webpack.ProvidePlugin({
        'Promise': 'exports?global.Promise!es6-promise',
        'window.fetch': 'exports?self.fetch!whatwg-fetch'
      }),
      new webpack.NoErrorsPlugin()
    ],
    postcss: function () {
      return [autoprefixer, precss];
    }
};
