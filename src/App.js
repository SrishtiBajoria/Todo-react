import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HomePage from "./components/HomPage";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route path="/Home" component={HomePage} />
      <Route path="/signup" component={Signup} />
    </Router>
  );
}

export default App;
