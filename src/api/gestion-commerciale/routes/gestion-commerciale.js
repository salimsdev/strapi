'use strict';

/**
 * gestion-commerciale router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::gestion-commerciale.gestion-commerciale', {
    config: {
        create: {
            middlewares: ["api::gestion-commerciale.gestion-commerciale-create"],
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
