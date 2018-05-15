import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import stateReducer from './reducer'
import HomepageApp from './components/homepage_app'
import '../../style/main.scss'

const store = createStore(
  stateReducer,
  applyMiddleware(thunkMiddleware)
)

render(
  <Provider store={store}>
    <HomepageApp />
  </Provider>,
  document.getElementById('app')
)
