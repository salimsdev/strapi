'use strict';

/**
 * financement service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::financement.financement');
