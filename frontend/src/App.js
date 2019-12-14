import React, { Component } from 'react'
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

//component
import NavBarComp from './Component/main/NavBarComp'
import Home from './Component/Home'
import Login from './Component/Login'
import Signup from './Component/Signup'
import Profile from './Component/Profile'

export class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <NavBarComp />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/points' component={Home} />
            <Route path='/services' component={Home} />
            <Route path='/about' component={Home} />
            <Route path='/contact' component={Home} />
            <Route path='/signup' component={Signup} />
            <Route path='/login' component={Login} />
            <Route path='/profile' component={Profile} />
          </Switch>
        </BrowserRouter>

      </div>
    )
  }
}
export default App;