import React from 'react'
import { Helmet } from 'react-helmet'
import { renderToString } from 'react-dom/server'

import red from '@material-ui/core/colors/red'
import green from '@material-ui/core/colors/green'
import JssProvider from 'react-jss/lib/JssProvider'
import { SheetsRegistry } from 'react-jss/lib/jss'
import {
    MuiThemeProvider,
    createMuiTheme,
    createGenerateClassName,
} from '@material-ui/core/styles'

import { App } from '../../../app/containers'

export default async function HomeController(ctx, next) {
    // eslint-disable-next-line 
    const sheetsManager = new Map()
    const sheetsRegistry = new SheetsRegistry()
    const generateClassName = createGenerateClassName()

    const theme = createMuiTheme({
        palette: {
            primary: green,
            accent: red,
            type: 'light',
        },
    })

    const reactDom = renderToString(
        <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
            <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
                <App />
            </MuiThemeProvider>
        </JssProvider>
    )

    const css = sheetsRegistry.toString()

    await ctx.render('home', { reactDom, helmet: Helmet.renderStatic(), css })
    await next()
}
