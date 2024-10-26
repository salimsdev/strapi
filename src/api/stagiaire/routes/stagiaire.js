'use strict';

/**
 * stagiaire router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::stagiaire.stagiaire', {
    config: {
        create: {
            middlewares: ["api::stagiaire.on-stagiaire-create"],
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
