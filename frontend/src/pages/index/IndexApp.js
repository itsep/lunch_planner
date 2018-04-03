import React, { Component } from "react";
import ReactDOM from "react-dom";

const App = () => {
  return (
    <div>
      <h1>Index</h1>
      <p>React here! This is our awesome Lunch Planer 😁!</p>
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
