
var path = require('path');

module.exports = {
    entry: {
      personal_data: './src/personal-data'
    },
    output: {
      path: path.join(__dirname, '/../static/js'),
      filename: '[name]-bundle.js'
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
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2015', 'react'],
            plugins: [
              ["react-intl", {
                  messagesDir: "./i18n-messages/",
                  enforceDescriptions: false
              }]
            ]
          }
        },
        {
          test: /\.json$/,
          loader: 'json'
        }
      ]
    }
};
