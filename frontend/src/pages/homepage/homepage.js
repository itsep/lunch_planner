import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import io from 'socket.io-client'
import thunkMiddleware from 'redux-thunk'
import stateReducer from './reducer'
import { fetchPageData } from './actions'
import ChangeDispatcher from './change_dispatcher'
import HomepageApp from './components/homepage_app'
import '../../style/main.scss'

const lunchspaceSubdomain = 'vsf-experts-ma'

const socket = io({
  path: '/subscriber',
  extraHeaders: {
    subdomain: lunchspaceSubdomain,
  },
})

const store = createStore(
  stateReducer,
  applyMiddleware(thunkMiddleware)
)

const subscriber = new ChangeDispatcher(socket, store)

store.dispatch(fetchPageData(lunchspaceSubdomain, store.getState().currentDate))

render(
  <Provider store={store}>
    <HomepageApp />
  </Provider>,
  document.getElementById('app')
)
