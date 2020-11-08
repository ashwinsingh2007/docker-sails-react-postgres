import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../styles/register-page.scss';

import { loginUserAction } from '../actions/authenticationActions';

class LoginPage extends Component {
  onHandleLogin = (event) => {
    event.preventDefault();

    let email = event.target.email.value;
    let password = event.target.password.value;

    const data = {
      email, password
    };

    this.props.dispatch(loginUserAction(data));
  }

  componentDidMount() {
    document.title = 'React Login';
  }

  errorMessage = (message) => (
    <div className="form_error form_wrapper">
      <div className="form_container">
        <div className="title_container">
          <h2>{message}</h2>
        </div>
      </div>
    </div>
  )

  render() {
    let isSuccess, message;
    const {login} = this.props.response;

    if (login.hasOwnProperty('loginDetails')) {
      isSuccess = login.loginDetails.auth;
      if(login.loginDetails.error) {
        message  = login.loginDetails.error
      } else {
        message = null;
      }
    }

    return (
      <div>
        {message&& (this.errorMessage(message))}
        <div className="form_wrapper">
          <div className="form_container">
            <div className="title_container">
              <h2>Login</h2>
            </div>
            <div className="row clearfix">
              <div className="">
                <form onSubmit={this.onHandleLogin}>
                  <div className="input_field"> <span><i aria-hidden="true" className="fa fa-envelope"></i></span>
                    <input type="email" name="email" placeholder="Email" required />
                  </div>
                  <div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                    <input type="password" name="password" placeholder="Password" required />
                  </div>
                  <input className="button" type="submit" value="Login" />
                </form>
                Don't have account? <Link to='register'>Register here</Link>
              </div>
            </div>
          </div>
        </div>


        {isSuccess && <Redirect to='dashboard' />}
      </div>
    );
  }
}

const mapStateToProps = (response) => ({ response });

export default connect(mapStateToProps)(LoginPage);