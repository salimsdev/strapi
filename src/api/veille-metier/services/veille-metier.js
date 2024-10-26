'use strict';

/**
 * veille-metier service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::veille-metier.veille-metier');
