"use strict";

const NODE_ENV = process.env.NODE_ENV || "development";
const dotenv = require("dotenv");

const webpack = require("webpack");
const path = require("path");

const join = path.join;
const resolve = path.resolve;

const getConfig = require("hjs-webpack");

const isDev = NODE_ENV === "development";
const isTest = NODE_ENV === "test";

const root = resolve(__dirname);
const src = join(root, "src");
const modules = join(root, "node_modules");
const dest = join(root, "dist");
// const css = join(src, "styles");
//
// ENV variables
const dotEnvVars = dotenv.config();
const environmentEnv = dotenv.config({
  path: join(root, "config", `${NODE_ENV}.config.js`),
  silent: true
});
const envVariables = Object.assign({}, dotEnvVars, environmentEnv);

let config = getConfig({
  isDev: isDev,
  in: join(src, "index.js"),
  out: dest,
  html: function(context) {
    return {
      "index.html": context.defaultTemplate({
        title: envVariables.APP_NAME,
        publicPath: isDev ? envVariables.ROOT_URL : "",
        meta: {}
      })
    };
  },
  devServer: {
    hostname: "0.0.0.0"
  }
});

const defines = Object.keys(envVariables)
  .reduce((memo, key) => {
    const val = JSON.stringify(envVariables[key]);
    memo[`__${key.toUpperCase()}__`] = val;
    return memo;
  }, {
    __NODE_ENV__: JSON.stringify(NODE_ENV),
    __DEBUG__: isDev
  });

config.plugins = [
  new webpack.DefinePlugin(defines)
].concat(config.plugins);
// END ENV variables

// CSS modules
const cssModulesNames = `${isDev ? "[path][name]__[local]__" : ""}[hash:base64:5]`;

const matchCssLoaders = /(^|!)(css-loader)($|!)/;

const findLoader = (loaders, match) => {
  const found = loaders.filter(l => l && l.loader && l.loader.match(match));
  return found ? found[0] : null;
};

// existing css loader
const cssloader = findLoader(config.module.loaders, matchCssLoaders);

const newloader = Object.assign({}, cssloader, {
  test: /\.module\.css$/,
  include: [src, /flexbox/],
  loader: cssloader.loader.replace(matchCssLoaders, `$1$2?modules&localIdentName=${cssModulesNames}$3`)
});
config.module.loaders.push(newloader);
cssloader.test = new RegExp(`[^module]${cssloader.test.source}`);
cssloader.loader = newloader.loader;

config.module.loaders.push({
  test: /flexboxgrid/,
  loader: "style!css?modules",
  include: /flexboxgrid/
});

config.module.loaders.push({
  test: /\.css$/,
  include: [modules],
  loader: "style!css",
  exclude: /flexboxgrid/
});


// CSS modules

// postcss
config.postcss = [].concat([
  require("precss")({}),
  require("autoprefixer")({}),
  require("cssnano")({})
]);

// END postcss

// Roots
config.resolve.root = [src, modules];
config.resolve.alias = {
  actions: join(src, "actions"),
  components: join(src, "components"),
  containers: join(src, "containers"),
  models: join(src, "models"),
  reducers: join(src, "reducers"),
  sagas: join(src, "sagas"),
  styles: join(src, "styles"),
  test: join(src, "test"),
  utils: join(src, "utils")
};
// end Roots

// Testing
if (isTest) {
  config.externals = {
    "react/addons": true,
    "react/lib/ReactContext": true,
    "react/lib/ExecutionEnvironment": true
  };

  config.module.noParse = /[/\\]sinon\.js/;
  config.resolve.alias.sinon = "sinon/pkg/sinon";

  config.plugins = config.plugins.filter(p => {
    const name = p.constructor.toString();
    const fnName = name.match(/^function (.*)\((.*\))/);

    const idx = [
      "DedupePlugin",
      "UglifyJsPlugin"
    ].indexOf(fnName[1]);
    return idx < 0;
  });
}
// End Testing

module.exports = config;
