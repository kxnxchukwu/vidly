import React, { Component } from 'react';
import {ToastContainer} from "react-toastify";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./components/Movies";
import NavBar from "./components/common/navbar";
import Customers from "./components/Customers";
import Rentals from "./components/Rentals";
import NotFound from "./components/NotFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/LoginForm";
import RegisterForm from './components/RegisterForm'
import Logout from './components/Logout';
import auth from './services/authService';
import ProtectedRoute from './components/common/protectedRoute';
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {  };

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({user});
  }
  render() {
    const {user} = this.state;
    return (
      <React.Fragment>
        <ToastContainer/>
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/Register" component={RegisterForm} />
            <Route path="/Logout" component={Logout} />
            <Route path="/Login" component={LoginForm} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route path="/movies" render={props => <Movies {...props} user= {user}/>} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/customers" component={Customers} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
