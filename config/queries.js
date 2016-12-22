var term_level = require('../queries/term_level');
module.exports = {
    term_level: {
        get_query_fn: term_level.getQuery
    }
};