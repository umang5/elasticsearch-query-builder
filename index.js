/* jslint node: true */

'use strict';

var util = require('util');
var debug = require('debug')('es-query-builder');
var queries = require('./queries');
var aggregations = require('./aggregations');
var ExpectationError = require('./lib').utils.error.ExpectationError;
var dataUtils = require('./lib').utils.data_utils;

var queryBuilder = {
    build: function (options) {
        if (!dataUtils.isObject(options)) {
            var err = new ExpectationError("Invalid Input Object");
            debug(err);
            throw err;
        }
        var queryDSL = {};
        if (options.term_filters) {
            queryDSL.query = queries.getQueries(options);
        }
        if(options.aggregations) {
            queryDSL.aggs = aggregations.getAggs(options);
        }
        return queryDSL;
    }
};

module.exports = queryBuilder;

/********** Test Code **********/
(function () {
    if (require.main === module) {
        var options1 = {
            term_filters: {
                and: {
                    not_equals: {
                        order_id: 2089617100
                    },
                    or: {
                        equals: {
                            item_id: 2203841820,
                            is_LMD: 1
                        }
                    },
                    exists: ['first_payment_date'],
                    type: ['items'],
                    ids: ["1", "4", "100"],
                    not_exists: ['last_payment_date']
                }
            }
        };

        var options2 = {
            term_filters: {
                not_equals: {
                    order_id: 2089617100
                },
                or: {
                    not_equals: {
                        item_id: 2203841820,
                        is_LMD: 1
                    }
                },
                exists: ['first_payment_date'],
                type: ['items'],
                ids: ["1", "4", "100"],
                not_exists: ['last_payment_date']
            }
        };

        var options3 = "test";

        console.log(JSON.stringify(queryBuilder.build(options2), null, 4));
    }
})();