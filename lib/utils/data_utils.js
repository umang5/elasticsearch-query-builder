/* jslint node: true */

"use strict";

var data_utils = {
    parseClause: function (clause) {
        var x = clause.split('_');
        var parsedClause = {
            actual: clause
        };

        if (x.length > 1 && x[0] === 'not') {
            parsedClause.actual = clause.substr(4);
            parsedClause.type = 'not'
        }

        return parsedClause;
    },

    isObject: function(obj) {
        return (!!obj) && (obj.constructor === Object);
    }
};

module.exports = data_utils;