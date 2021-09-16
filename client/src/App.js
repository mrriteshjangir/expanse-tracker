import React from 'react'
import { BrowserRouter as Router,Route,Switch,Redirect } from 'react-router-dom'

import Home from './routes/Home';
import Dashboard from './routes/Dashboard';
import Signin from './routes/Signin';
import Signup from './routes/Signup';

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/create" component={Signup} />
                <Route path="/login" component={Signin}/>
                <Route path="/dashboard" component={Dashboard} />

                <Redirect to="/"  from="*"/>
            </Switch>
        </Router>
    )
}
