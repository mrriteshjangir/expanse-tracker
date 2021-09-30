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
import AddTransaction from "./routes/AddTransaction";
import EditTransaction from "./routes/EditTransaction";

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

          <Route path="/dashboard" component={Dashboard} />

          <Route path="/addTransaction" component={AddTransaction} />

          <Route path="/editTransaction/:ind" component={EditTransaction} />
          
          {/* Add All pages above this redirection */}
          
          {token ? <Redirect to="/dashboard" /> : <Signin />}

          <Redirect to="/" from="*" />
        </Switch>
      </Router>
    );
  }
}