import React from 'react'
import { render } from 'react-dom'

import './assets/css/reset.css'
import './assets/css/styles-global.scss'

import App from './app.jsx'
import * as serviceWorker from './service-worker.js'

render(<App />, document.querySelector('[data-js="app"]'))

serviceWorker.unregister()
