const argv = require("yargs").argv;
const webpackConfig = require("./webpack.config");

module.exports = (config) => {
  config.set({
    basePath: "",
    frameworks: ["mocha"],
    files: [
      "tests.webpack.js",
    ],

    preprocessors: {
      // add webpack as preprocessor
      "tests.webpack.js": ["webpack"],
    },

    webpack: webpackConfig,
    webpackServer: {
      noInfo: true,
      quiet: true,
    },

    plugins: [
      "karma-mocha",
      "karma-webpack",
      "karma-phantomjs-launcher",
      "karma-spec-reporter",
      "karma-mocha-reporter",
      "karma-sourcemap-loader",
      "karma-osx-reporter",
    ],

    reporters: ["mocha", "osx"],

    mochaReporter: {
      showDiff: true,
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ["PhantomJS"],
    singleRun: !argv.watch,
  });
};
