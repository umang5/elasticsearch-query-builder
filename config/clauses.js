module.exports = {
    and: {
        type: 'compound'
    },
    or: {
        type: 'compound'
    },
    equals: {
        type: 'term_level',
        es_clause: 'term'
    },
    in: {
        type: 'term_level',
        es_clause: 'terms'
    },
    range: {
        type: 'term_level',
        es_clause: 'range'
    },
    prefix: {
        type: 'term_level',
        es_clause: 'prefix'
    },
    wildcard: {
        type: 'term_level',
        es_clause: 'wildcard'
    },
    exists: {
        type: 'term_level',
        es_clause: 'exists'
    },
    regexp: {
        type: 'term_level',
        es_clause: 'regexp'
    },
    type: {
        type: 'term_level',
        es_clause: 'type'
    },
    ids: {
        type: 'term_level',
        es_clause: 'ids'
    }

};