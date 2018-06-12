import React from 'react'
import { render } from 'react-dom'
import '../../service_worker/client'
import LoginApp from './components/login_app'
import '../../style/main.scss'

render(<LoginApp />, document.getElementById('app'))


