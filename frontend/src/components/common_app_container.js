import React from 'react'
import PropTypes from 'prop-types'
import { MuiThemeProvider } from 'material-ui/styles'
import { createGenerateClassName, JssProvider } from 'react-jss'
import theme from '../style/theme'


const generateClassName = createGenerateClassName()

export default function CommonAppContainer(props) {
  return (
    <JssProvider generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>
        {props.children}
      </MuiThemeProvider>
    </JssProvider>
  )
}
CommonAppContainer.propTypes = {
  children: PropTypes.any.isRequired,
}
