module.exports = {
    async afterCreate(event) {
        const { result } = event;

        if (result.sent) {
            // const data = await strapi.entityService.findMany("api::document.document", result.id, { populate: ['doc'] })
            const data = await strapi.entityService.findMany("api::document.document", {
                filters: { email: { id: result.id } },
                populate: { doc: true }
            })
            // data.forEach(element => strapi.log.info(element))
            strapi.log.info(data)
            
    
            try{
                await strapi.plugins['email'].services.email.send({
                    to: result.to,
                    from: result.from,
                    replyTo: result.from,
                    subject: result.objet,
                    html: result.text,
                    attachments: data.map(file => ({
                        filename: file.name + '.docx',
                        path: 'http://localhost:1337' + file.doc.url,
                        contentType: file.doc.mime
                        // content: fs.readFileSync('http://localhost:1337' + file.doc.url).toString('base64')
                    }))
                })
            } catch(err) {
                console.log(err)
            }
        }

    }
}