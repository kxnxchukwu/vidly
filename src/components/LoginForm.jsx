import React from "react";
import Form from './common/form';
import Joi from 'joi-browser';
import { Redirect } from 'react-router-dom';
import auth from './../services/authService';

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password')
  }

  doSubmit = async () => {
    try {
      const {data} = this.state;
      await auth.login(data.username, data.password);
      const {state} = this.props.location
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if(ex.response && ex.response.status === 400){
        const errors = {...this.state.errors};
        errors.username = ex.response.data;
        this.setState({errors});
      }
    }

  };

  render() {
      if (auth.getCurrentUser()) return <Redirect to="/" />
    return (
      <div className="container">
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}

export default LoginForm;
