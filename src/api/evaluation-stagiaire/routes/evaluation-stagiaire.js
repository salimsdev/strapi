'use strict';

/**
 * evaluation-stagiaire router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::evaluation-stagiaire.evaluation-stagiaire', {
    config: {
        create: {
            middlewares: ["api::evaluation-stagiaire.evaluation-stagiaire-create"],
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
