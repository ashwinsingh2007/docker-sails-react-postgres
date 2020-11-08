import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUserAction, getUserDetailsAction } from '../actions/authenticationActions';
import '../styles/register-page.scss';

class DashboardPage extends Component {
  handleLogout = (event) => {
    this.props.dispatch(logoutUserAction());
  }
  componentDidMount() {
    this.props.dispatch(getUserDetailsAction());
  }
  getUserName() {
    const { login } = this.props.response;
    if (login.loginDetails && login.loginDetails.currentUser) {
      const { currentUser } = login.loginDetails;
      return `${currentUser.firstName} ${currentUser.lastName}`
    }
    return '';
  }
  render() {
    let isSuccess, message;
    const { login } = this.props.response;
    if (login.hasOwnProperty('loginDetails')) {
      isSuccess = login.loginDetails.auth;
      // message = this.props.response.login.response.message;
    }
    return (
      <div>
        {!isSuccess && <Redirect to='register' />}
        <div className="form_wrapper">
          <div className="form_container">
            <div className="title_container">
              <h2>Hello, {this.getUserName()}</h2>
            </div>
            <div className="row clearfix">
              <div className="">
              </div>
            </div>
          </div>
          <div>
            <button className="buttonStyle" onClick={this.handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (response) => ({ response });
export default connect(mapStateToProps)(DashboardPage);
