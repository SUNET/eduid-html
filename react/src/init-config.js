
const webpack = require('webpack');

module.exports = {
    initialConfigPlugin: new webpack.DefinePlugin({
        EDUID_COOKIE_NAME: JSON.stringify("sessid"),
        TOKEN_SERVICE_URL: JSON.stringify("/services/authn/login"),
        EDUID_CONFIG_URL: JSON.stringify("/services/jsconfig/config"),
        AVAILABLE_LANGUAGES: JSON.stringify([ ['en', 'English'], ['sv', 'Svenska'] ])
    }),
};
