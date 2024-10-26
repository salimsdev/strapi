module.exports = {
    sendScheduledEmails: {
        task: async ({ strapi }) => {
            const emails = await strapi.entityService.findMany("api::email.email", {
                filters: { 
                    sent: false,
                    dateToSend: { $lt: new Date().toISOString()}
                },
            })

            console.log(emails)
            if (emails && emails.length > 0) {
                Promise.all(emails.map(async email => {
                    await strapi.plugins['email'].services.email.send({
                        to: email.to,
                        from: email.from,
                        replyTo: email.from,
                        subject: email.objet,
                        html: email.text
                    })
                    await strapi.entityService.update('api::email.email', email.id, {
                        data: {
                            sent: true
                        }
                    })
                }))
            }

        },
        options: {
            rule: "0 0 5 * * *"
        }
    }
}