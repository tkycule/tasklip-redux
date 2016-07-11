/*eslint no-var:0*/

require("babel-polyfill");
// some setup first

var chai = require("chai");
var chaiEnzyme = require("chai-enzyme");

chai.use(chaiEnzyme());
chai.use(require("chai-immutable"));

var context = require.context("./src", true, /\.spec\.js$/);
context.keys().forEach(context);
