import React from 'react'
import { render } from 'react-dom'
import LunchspacesApp from './components/lunchspaces_app'
import '../../style/main.scss'
import './lunchspaces.scss'

render(<LunchspacesApp />, document.getElementById('app'))
