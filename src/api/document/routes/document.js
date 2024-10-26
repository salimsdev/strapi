'use strict';

/**
 * document router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::document.document', {
    config: {
        create: {
          middlewares: ["api::document.on-document-create"],
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
