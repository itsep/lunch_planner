import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import stateReducer from './reducer'
import HomepageApp from './components/homepage_app'
import '../../style/main.scss'

const store = createStore(stateReducer)

render(
  <Provider store={store}>
    <HomepageApp />
  </Provider>,
  document.getElementById('app')
)
