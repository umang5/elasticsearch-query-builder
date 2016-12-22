/* jslint node: true */

"use strict";

var util = require('util');
var debug = require('debug')('es-query-builder:queries');
var compound = require('./compound');
var constants = require('../config').constants;
var clausesConfig = require('../config').clauses;
var ExpectationError = require('../lib').utils.error.ExpectationError;
var dataUtils = require('../lib').utils.data_utils;

var queries = {
    getQueries: function (options) {
        var query = {};
        var termFilters = options.term_filters;
        if (termFilters) {
            query.filtered = {
                filter: {}
            };

            var rootClause = Object.keys(termFilters)[0];
            var actualRootClause = dataUtils.parseClause(rootClause).actual;
            if(!clausesConfig[actualRootClause]) {
                var err = new ExpectationError("Invalid Clause: " + actualRootClause);
                debug(err);
                throw err;
            }
            var termLevelQueries = {};
            if (clausesConfig[actualRootClause].type === constants.QUERY_TYPES.COMPOUND) {
                termLevelQueries = compound.getQuery(actualRootClause, termFilters[rootClause]);
            } else if (clausesConfig[actualRootClause].type === constants.QUERY_TYPES.TERM_LEVEL) {
                termLevelQueries = compound.getQuery('and', termFilters);
            }

            query.filtered.filter = termLevelQueries;
        }
        return query;
    },

    compound: require('./compound'),
    term_level: require('./term_level')
};

module.exports = queries;