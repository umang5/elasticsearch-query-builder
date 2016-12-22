/* jslint node: true */

'use strict';

var util = require('util');

function ExpectationError(message) {
    Error.call(this); //super constructor
    // Error.captureStackTrace(this, this.constructor); //super helper method to include stack trace in error object

    this.name = this.constructor.name; //set our function’s name as error name.
    this.message = message; //set the error message
    this.status = 417;
}
util.inherits(ExpectationError, Error);

module.exports = {
    ExpectationError: ExpectationError
};
