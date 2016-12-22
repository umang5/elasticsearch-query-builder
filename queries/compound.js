/* jslint node: true */

"use strict";

var util = require('util');
var debug = require('debug')('es-query-builder:queries:compound');
var constants = require('../config').constants;
var queriesConfig = require('../config/queries');
var clausesConfig = require('../config').clauses;
var ExpectationError = require('../lib').utils.error.ExpectationError;
var dataUtils = require('../lib').utils.data_utils;

var compound = {
    getQuery: function (clause, options) {
        if(!clausesConfig[clause] || clausesConfig[clause].type !== constants.QUERY_TYPES.COMPOUND) {
            var err = new ExpectationError("Invalid Compound Clause: " + clause);
            throw err;
        }
        var subQuery = {};
        subQuery.bool = {};

        Object.keys(options).forEach(function (key) {
            var clauseQuery = {};
            var parsedClause = dataUtils.parseClause(key);
            var parentClause ;
            if(clause === 'or') {
                parentClause = 'should'
            } else if (parsedClause.type && parsedClause.type === 'not') {
                parentClause = 'must_not';
            } else {
                parentClause = 'must';
            }

            var actualClause = parsedClause.actual;
            if(!clausesConfig[actualClause]) {
                var err = new Error("Invalid Term Level Clause: " + actualClause);
                debug(err);
                throw err;
            }
            if (clausesConfig[actualClause].type === constants.QUERY_TYPES.COMPOUND) {
                clauseQuery = compound.getQuery(actualClause, options[key]);
            } else {
                clauseQuery = queriesConfig[clausesConfig[actualClause].type].get_query_fn(actualClause, options[key]);
            }

            subQuery.bool[parentClause] = subQuery.bool[parentClause] || [];

            if (Array.isArray(clauseQuery)) {
                subQuery.bool[parentClause] = subQuery.bool[parentClause].concat(clauseQuery);
            } else {
                subQuery.bool[parentClause].push(clauseQuery);
            }
        });
        return subQuery;
    }
};

module.exports = compound;