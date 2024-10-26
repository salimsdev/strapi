'use strict';

/**
 * `is-owner` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
	return async (ctx, next) => {
		const entryId = ctx.params.id;
		const user = ctx.state.user;
		const userId = user?.id;

		if (!userId) return ctx.unauthorized(`Vous n'avez pas accès à ces données.`)

		const apiName = ctx.state.route.info.apiName

		function generateUID(apiName) {
			const apiUid = `api::${apiName}.${apiName}`
			return apiUid
		}

		const appUid = generateUID(apiName);

		if (entryId) {
			const entry = await strapi.entityService.findOne(appUid, entryId, {
				populate: "*",
		})

		if (entry && entry.user.id !== userId)
			return ctx.unauthorized(`Vous n'avez pas accès à ces données.`);
		}

		if (!entryId) {
			ctx.query = {
				...ctx.query,
				filters: { ...ctx.query.filters, user: userId },
			}
		}

		await next()
	}
}

// module.exports = (config, { strapi }) => {
// 	// Add your own logic here.
// 	return async (ctx, next) => {
// 		strapi.log.info('In is-owner middleware.');
  
// 		await next();
// 	}
// }
