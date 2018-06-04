import React from 'react'
import PropTypes from 'prop-types'
import { MuiThemeProvider } from 'material-ui/styles'
import theme from '../style/theme'

export default function CommonAppContainer(props) {
  return (
    <MuiThemeProvider theme={theme}>
      {props.children}
    </MuiThemeProvider>
  )
}
CommonAppContainer.propTypes = {
  children: PropTypes.any.isRequired,
}
