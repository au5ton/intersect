define(['./query', './indicator', './logger'], function(query, indicator, logger) {
        //return an object to define the "my/shirt" module.
        return {
            query: query,
            indicator: indicator,
            logger: logger
        };
    }
);
