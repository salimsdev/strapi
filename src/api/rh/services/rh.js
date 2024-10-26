'use strict';

/**
 * rh service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::rh.rh');
