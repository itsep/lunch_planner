import React from 'react'
import localizedStrings from '../../../localization'

function App() {
  localizedStrings.setLanguage('en')
  return (
    <h1>{localizedStrings.test}</h1>
  )
}

export default App
