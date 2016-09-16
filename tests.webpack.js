/* eslint no-var:0 import/no-extraneous-dependencies:0 */

require("babel-polyfill");
// some setup first

const chai = require("chai");
const chaiEnzyme = require("chai-enzyme");
const dirtyChai = require("dirty-chai");
const chaiImmutable = require("chai-immutable");

chai.use(chaiEnzyme());
chai.use(chaiImmutable);
chai.use(dirtyChai);

const context = require.context("./src", true, /\.spec\.js$/);
context.keys().forEach(context);
