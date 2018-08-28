import Koa from 'koa'
import path from 'path'
import views from 'koa-views'
import Router from 'koa-router'
import middlewares from 'koa-middlewares'

import { ErrorHandle } from './middleware'
import { HomeController } from './controller'

class Server {
    constructor(config) {
        this.config = config
    }

    start() {
        const server = new Koa()
        const router = new Router()

        router.get('/', HomeController)

        const { APP_PORT, NODE_ENV, APP_DEBUG } = this.config

        server.use(views(__dirname + '/views', { extension: 'pug' }))

        server.use(ErrorHandle)

        server.use(middlewares.rt())
        server.use(middlewares.etag())
        server.use(middlewares.favicon())
        server.use(middlewares.compress())
        server.use(middlewares.conditional())

        server.use(middlewares.staticCache(path.join(__dirname, 'dist'), {
            buffer: !APP_DEBUG,
            maxAge: APP_DEBUG ? 0 : 60 * 60 * 24 * 7
        }))
        server.use(middlewares.bodyParser())

        if (APP_DEBUG && NODE_ENV !== 'test') {
            server.use(middlewares.logger())
        }

        server
            .use(router.routes())
            .use(router.allowedMethods())

        server.on('error', () => {
            if (NODE_ENV === 'test') {
                return
            }
        })

        // eslint-disable-next-line no-console
        server.listen(APP_PORT, () => console.log(`App is listening on port ${APP_PORT}`))
    }
}

export default Server
