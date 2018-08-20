export default async function ErrorHandle (ctx, next) {
    try {
        await next()
    } catch (err) {
        ctx.type = 'html'
        ctx.body = `
            <pre>${err.message}</pre>
            <pre>${err.stack}</pre>
        `
        ctx.status = err.status || 500

        ctx.app.emit('error', err, ctx)
    }
}
