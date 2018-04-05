import React from 'react'
import ReactDOM from 'react-dom'
import teamImage from './assets/team.jpg'

const App = () => (
  <div>
    <h1>Index</h1>
    <p>React here! This is our awesome Lunch Planer!</p>
    <h2>Team</h2>
    <img src={teamImage} alt="I.t. Team" width="100%" />
  </div>
)

export default App

ReactDOM.render(<App />, document.getElementById('app'))
