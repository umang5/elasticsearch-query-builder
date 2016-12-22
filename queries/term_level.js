/* jslint node: true */

"use strict";

var util = require('util');
var debug = require('debug')('es-query-builder:queries:term_evel');
var constants = require('../config').constants;
var clausesConfig = require('../config').clauses;

var termLevel = {
    getQuery: function (clause, options) {
        if(!clausesConfig[clause] || clausesConfig[clause].type !== constants.QUERY_TYPES.TERM_LEVEL) {
            var err = new Error("Invalid Term Level Clause: " + clause);
            debug(err);
            throw err;
        }
        var subQueries = [];
        switch (clause) {
            case 'ids': {
                var subQuery = {};
                subQuery[clausesConfig[clause].es_clause] = {};
                subQuery[clausesConfig[clause].es_clause].values = options;
                subQueries.push(subQuery);
                break;
            }
            default: {
                Object.keys(options).forEach(function (field) {
                    var subQuery = {};
                    var value = options[field];
                    subQuery[clausesConfig[clause].es_clause] = {};
                    if (Array.isArray(options) && !isNaN(field)) {
                        if (clause === 'exists') {
                            field = 'field'
                        } else if (clause === 'type') {
                            field = 'value';
                        }
                    }
                    subQuery[clausesConfig[clause].es_clause][field] = value;
                    subQueries.push(subQuery);
                });
                break;
            }
        }
        return subQueries;
    }
};

module.exports = termLevel;