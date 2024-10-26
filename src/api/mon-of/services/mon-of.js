'use strict';

/**
 * mon-of service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::mon-of.mon-of');
