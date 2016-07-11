/*eslint no-var:0*/

var argv = require("yargs").argv;
var webpackConfig = require("./webpack.config");
webpackConfig.devtool = "inline-source-map";

module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: ["mocha", "chai"],
    files: [
      "tests.webpack.js"
    ],

    preprocessors: {
      // add webpack as preprocessor
      "tests.webpack.js": ["webpack", "sourcemap"]
    },

    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    },

    plugins: [
      "karma-mocha",
      "karma-chai",
      "karma-webpack",
      "karma-phantomjs-launcher",
      "karma-spec-reporter",
      "karma-mocha-reporter",
      "karma-sourcemap-loader",
      "karma-osx-reporter"
    ],

    reporters: ["mocha", "osx"],

    mochaReporter: {
      showDiff: true
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ["PhantomJS"],
    singleRun: !argv.watch
  });
};
