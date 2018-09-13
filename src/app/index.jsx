import React from 'react'
import orange from '@material-ui/core/colors/orange'
import purple from '@material-ui/core/colors/purple'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {
    MuiThemeProvider,
    createMuiTheme,
} from '@material-ui/core/styles'

import { App } from './containers'
import configureStore from './store'

const store = configureStore()

class Main extends React.Component {
    // Remove the server-side injected CSS.
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side')

    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return <App />
  }
}

const theme = createMuiTheme({
    palette: {
        primary: purple,
        accent: orange,
        type: 'dark',
    },
})

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <Main />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root'),
)
