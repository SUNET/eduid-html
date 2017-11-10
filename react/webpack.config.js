
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const initialConfigPlugin = require('./src/init-config').initialConfigPlugin;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: {
      // To activate the web server, uncomment below 2 lines and
      // add a script to package.json pointing to "webpack-dev-server"
      // WebpackDevServer host and port:
      // server: 'webpack-dev-server/client?http://localhost:8080',
      // "only" prevents reload on syntax errors:
      // hot: 'webpack/hot/only-dev-server',
      index: './src/entry-points/index',
      personal_data: './src/entry-points/personal-data',
      dashboard: ['babel-polyfill', './src/entry-points/dashboard-tabbed-form'],
      openid_connect: './src/entry-points/openid-connect',
      openid_connect_freja: './src/entry-points/openid-connect-freja'
    },
    output: {
      path: path.join(__dirname, 'build'),
      publicPath: '/static/build/',
      filename: '[name]-bundle.dev.js'
    },
    devtool: 'source-map',
    resolve: {
      // allow us to import components in tests like:
      // import Example from 'components/Example';
      modules: [
        path.resolve(__dirname, 'src'),
        'node_modules'
      ],
      // allow us to avoid including extension name
      extensions: ['.js', '.jsx', '.json'],
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loaders: ['babel-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.scss$/,
          loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
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
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
          loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
          loader: 'file-loader'
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
          loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
        }
      ]
    },
    plugins:[
      // Initial configuration
      initialConfigPlugin,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.ProvidePlugin({
        'Promise': 'exports-loader?global.Promise!es6-promise',
        'window.fetch': 'exports-loader?global.fetch!whatwg-fetch'
      }),
      new webpack.NoEmitOnErrorsPlugin(),
        new webpack.LoaderOptionsPlugin({
         // test: /\.xxx$/, // may apply this only for some modules
         options: {
           postcss: function () {
             return [autoprefixer, precss];
           }
         }
       }),
        new BundleAnalyzerPlugin()
    ]
};
