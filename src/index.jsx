import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App, { store } from './components/index'

const target = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  target,
)
