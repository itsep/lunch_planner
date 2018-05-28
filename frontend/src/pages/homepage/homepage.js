import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import stateReducer from './reducer'
import { fetchPageData } from './actions'
import HomepageApp from './components/homepage_app'
import '../../style/main.scss'

const store = createStore(
  stateReducer,
  applyMiddleware(thunkMiddleware)
)

store.dispatch(fetchPageData('vsf-experts-ma'))

render(
  <Provider store={store}>
    <HomepageApp />
  </Provider>,
  document.getElementById('app')
)
