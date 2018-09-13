import React from 'react'
import { create } from 'jss'
import { Helmet } from 'react-helmet'
import { renderToString } from 'react-dom/server'

import purple from '@material-ui/core/colors/purple'
import orange from '@material-ui/core/colors/orange'
import JssProvider from 'react-jss/lib/JssProvider'
import { SheetsRegistry } from 'react-jss/lib/jss'
import {
    jssPreset,
    MuiThemeProvider,
    createMuiTheme,
    createGenerateClassName,
} from '@material-ui/core/styles'

import { App } from '../../../app/containers'

export default async function HomeController(ctx, next) {
    // Create a sheetsRegistry instance.
    const sheetsRegistry = new SheetsRegistry()

    // Create a sheetsManager instance.
    // eslint-disable-next-line 
    const sheetsManager = new Map()

    // Create a JSS instance with the default preset of plugins.
    // It's optional.
    const jss = create(jssPreset())

    // Create a theme instance.
    const theme = createMuiTheme({
        palette: {
            primary: purple,
            accent: orange,
            type: 'dark',
        },
    });

    // Create a new class name generator.
    const generateClassName = createGenerateClassName()

    const reactDom = renderToString(
        <JssProvider jss={jss} registry={sheetsRegistry} generateClassName={generateClassName}>
            <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
                <App />
            </MuiThemeProvider>
        </JssProvider>
    )

    const css = sheetsRegistry.toString()

    await ctx.render('home', { reactDom, helmet: Helmet.renderStatic(), css })
    await next()
}
