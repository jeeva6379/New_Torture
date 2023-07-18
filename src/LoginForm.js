import React from 'react';

import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import './App.css';
const LoginForm = () => {
    return (

        <div className="container">          
        <div className="screen">
        
          <div className="screen__content">
            <form className="login">
            <h1 class="form__heading">Admin</h1><br/>

              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  type="text"
                  className="login__input"
                  placeholder="Enter your email..."
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input
                  type="password"
                  className="login__input"
                  placeholder="Enter your password..."
                />
              </div>
              <button className="button login__submit">
                <span className="button__text">Login</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
            </form>
          
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
    );
  };
  
  export default LoginForm;
  