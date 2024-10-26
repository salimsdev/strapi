'use strict';

/**
 * evaluation router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::evaluation.evaluation', {
    config: {
        create: {
            middlewares: ["api::evaluation.on-evaluation-create"],
        },
        find: {
            middlewares: ["global::is-owner"],
        },
        findOne: {
            middlewares: ["global::is-owner"],
        },
        update: {
            middlewares: ["global::is-owner"],
        },
        delete: {
            middlewares: ["global::is-owner"],
        },
    },
});
