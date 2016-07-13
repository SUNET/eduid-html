//  from https://github.com/lelandrichardson/enzyme-example-karma-webpack/raw/master/test/.setup.js
//  see  https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md


var context = require.context('.', true, /-test\.js$/); //make sure you have your directory and regex test set correctly!
context.keys().forEach(context);
