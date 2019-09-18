import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./components/Movies";
import NavBar from "./components/common/navbar";
import Customers from "./components/Customers";
import Rentals from "./components/Rentals";
import NotFound from "./components/NotFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/LoginForm";
import RegisterForm from './components/RegisterForm'
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
        <Route path="/Register" component={RegisterForm} />
          <Route path="/Login" component={LoginForm} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies/new" component={MovieForm} ></Route>
          <Route path="/movies" component={Movies} />
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

export default App;
