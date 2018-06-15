import React from 'react'
import { render } from 'react-dom'
import '../../lib/serviceworker-registration'
import LoginApp from './components/login_app'
import '../../style/main.scss'
import './login.scss'

render(<LoginApp />, document.getElementById('app'))


