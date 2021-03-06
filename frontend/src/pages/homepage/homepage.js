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
import { shouldUseDevelopmentSubdomainHandling, currentLunchspaceSubdomain } from '../../lib/lunchspace_subdomain'

const query = shouldUseDevelopmentSubdomainHandling() && { subdomain: currentLunchspaceSubdomain() }
const socket = io({
  path: '/subscriber',
  query,
  transports: ['websocket'],
})

const store = createStore(
  stateReducer,
  applyMiddleware(thunkMiddleware)
)
// eslint-disable-next-line no-unused-vars
const subscriber = new ChangeDispatcher(socket, store)

store.dispatch(fetchPageData(store.getState().currentDate))

render(
  <Provider store={store}>
    <HomepageApp />
  </Provider>,
  document.getElementById('app')
)
