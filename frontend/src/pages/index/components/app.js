import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Card, CardHeader } from 'material-ui/Card'
import Ruc from './ruc'

function App() {
  return (
    <MuiThemeProvider>
      <Card>
        <CardHeader
          title="Lunch Planner"
          subtitle="Team It"
        />
        <Ruc />
      </Card>
    </MuiThemeProvider>
  )
}

export default App
