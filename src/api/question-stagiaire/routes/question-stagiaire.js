'use strict';

/**
 * question-stagiaire router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::question-stagiaire.question-stagiaire', {
    config: {
        create: {
            middlewares: ["api::question-stagiaire.question-stagiaire-create"],
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
})
