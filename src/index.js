import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import * as serviceWorker from './serviceWorker';
import { indigo, amber } from '@material-ui/core/colors'


const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            main: indigo[800],
            light: indigo[600],
            dark: indigo[900],
            contrastText: '#fff'
        },
        secondary: {
            main: amber[500],
            light: amber[300],
            dark: amber[800],
            contrastText: '#212121'
        }
    }
})

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <App />
    </MuiThemeProvider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
