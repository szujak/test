import React from 'react'
import { Helmet } from 'react-helmet'
import { renderToString } from 'react-dom/server'

import { App } from '../../../app/containers'

export default async function HomeController(ctx, next) {
    const reactDom = renderToString(<App />)

    await ctx.render('home', { reactDom, helmet: Helmet.renderStatic() })
    await next()
}
