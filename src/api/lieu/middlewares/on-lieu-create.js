'use strict';

/**
 * `on-lieu-create` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
    return async (ctx, next) => {
		console.log('middleware for lieu')
      	const user = ctx.state.user
        if (!user) return ctx.unauthorized("Vous n'êtes pas authentifié.")

        await next()

        const uid = "plugin::users-permissions.user"

		const payload = {
			data: {
				lieux: {
					connect: [ctx.response.body.data.id],
				},
			},
		}

        try {
            await strapi.entityService.update(uid, user.id, payload)
        } catch (error) {
			console.log(error)
            ctx.badRequest("Error Updating Lieu")
        }
    }
}
