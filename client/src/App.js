import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Home from "./routes/Home";
import Dashboard from "./routes/Dashboard";
import Signin from "./routes/Signin";
import Signup from "./routes/Signup";

import useToken from "./components/useToken";

export default function App() {
  const { token, setToken } = useToken();

  if (!token || token.error) {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />

          <Signin setToken={setToken} />

          <Redirect to="/" from="*" />
        </Switch>
      </Router>
    );
  } else {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />

          {token ? <Redirect to="/dashboard" /> : <Signin />}

          <Route path="/dashboard" component={Dashboard} />

          <Redirect to="/" from="*" />
        </Switch>
      </Router>
    );
  }
}