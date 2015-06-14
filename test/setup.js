'use strict';

var chai = require('chai');

require('should');

chai.config.includeStack = true;

global.conf = require('./conf/index.js');
global.h = require('./helper.js');
global.assert = chai.assert;
global.expect = chai.expect;
