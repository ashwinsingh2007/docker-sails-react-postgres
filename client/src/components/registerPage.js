import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../styles/register-page.scss';

import { registerUserAction } from '../actions/authenticationActions';

class RegisterPage extends Component {
  state = {
    agreed: true,
    passwordMatched: true,
  }
  onHandleRegistration = (event) => {
    event.preventDefault();
    let firstName = event.target.firstName.value;
    let lastName = event.target.lastName.value;
    let gender = event.target.female.checked ? 2 : 1
    let email = event.target.email.value;
    let password = event.target.password.value;
    let passwordRepeat = event.target.passwordRepeat.value;
    let agreed = event.target.agree.checked;

    const data = {
      firstName, lastName, email, password, gender
    };
    this.setState({
      passwordMatched: passwordRepeat === password,
      agreed
    })

    this.props.dispatch(registerUserAction(data));
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
    let message, isSuccess;
    const {register} = this.props.response;
    if (register.hasOwnProperty('authDetails')) {
      isSuccess = register.authDetails.auth;
      if(register.authDetails.error) {
        message  = register.authDetails.error
      } else {
        message = null;
      }
    }

    return (
      <div>
        {!this.state.agreed && (this.errorMessage('Please confirm the agreement'))}
        {!this.state.passwordMatched && (this.errorMessage('Password Doesnt match in re-type'))}
        {message&& (this.errorMessage(message))}
        <div className="form_wrapper">
          <div className="form_container">
            <div className="title_container">
              <h2>Registration</h2>
            </div>
            <div className="row clearfix">
              <div className="">
                <form onSubmit={this.onHandleRegistration}>
                  <div className="input_field"> <span><i aria-hidden="true" className="fa fa-envelope"></i></span>
                    <input type="email" name="email" placeholder="Email" required />
                  </div>
                  <div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                    <input type="password" name="password" placeholder="Password" required />
                  </div>
                  <div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                    <input type="password" name="passwordRepeat" placeholder="Re-type Password" required />
                  </div>
                  <div className="row clearfix">
                    <div className="col_half">
                      <div className="input_field"> <span><i aria-hidden="true" className="fa fa-user"></i></span>
                        <input type="text" name="firstName" placeholder="First Name" />
                      </div>
                    </div>
                    <div className="col_half">
                      <div className="input_field"> <span><i aria-hidden="true" className="fa fa-user"></i></span>
                        <input type="text" name="lastName" placeholder="Last Name" required />
                      </div>
                    </div>
                  </div>
                  <div className="input_field radio_option">
                    <input type="radio" name="male" id="rd1" />
                    <label htmlFor="rd1">Male</label>
                    <input type="radio" name="female" id="rd2" />
                    <label htmlFor="rd2">Female</label>
                  </div>
                  <div className="input_field checkbox_option">
                    <input type="checkbox" name="agree" id="cb1" />
                    <label htmlFor="cb1">I agree with terms and conditions</label>
                  </div>
                  <input className="button" type="submit" value="Register" />
                </form>
                Already have account? <Link to='login'>Login here</Link>
              </div>
            </div>
          </div>
        </div>



    {isSuccess &&  <Redirect to='login' />}
      </div>
    )
  }
}

const mapStateToProps = (response) => ({
  response
});

export default connect(mapStateToProps)(RegisterPage);
