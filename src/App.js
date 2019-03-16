import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SignIn from '../src/auth/SignIn';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Landing from './landing/Landing'
import CustomizedSnackBars from './reusable/snackbar/CustomizedSnackbars';
import { hideSuccess, hideError } from './actions/snackbar';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import {logoutUser} from './actions/auth';
import LinearProgress from '@material-ui/core/LinearProgress';
import Profile from './profile/Profile';
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';

const PrivateRoute = ({ props ,component, isAuthenticated, ...rest }) => ( // eslint-disable-line
  jwt.verify(localStorage.getItem('token')
      , process.env.REACT_APP_JWT_SECRET, function(err, decoded) {
      if(err){
        props.dispatch(logoutUser());
      }
    }),
    <Route
    {...rest} render={props => (
      isAuthenticated ? (
        React.createElement(component, props)
      ) : (
        <Redirect
          to={{
            pathname: '/login',
          state: { from: props.location }, // eslint-disable-line
          }}
        />
      )
    )}
  />
);
class App extends Component {
  render() {
    
    return (
      <div className="App">
      {this.props.showLoader && <LinearProgress />}
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/login" />} />
          <Route path="/login" exact component={SignIn} />
          <Route path="/forgotpassword" exact component={ForgotPassword} />
          <Route path="/resetpassword/:resettoken" component={ResetPassword}/>
          <PrivateRoute props={this.props}  isAuthenticated={this.props.isAuthenticated} path="/app" component={Landing} />
        </Switch>
        <CustomizedSnackBars
          close={setTimeout(() => { this.props.dispatch(hideSuccess()) }, 3000)}
          variant={"success"}
          Message={this.props.message}
          open={this.props.showSuccessSnackbar} />
        <CustomizedSnackBars
          close={setTimeout(() => { this.props.dispatch(hideError()) }, 3000)}
          variant={"error"}
          Message={this.props.message}
          open={this.props.showErrorSnackbar} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    showSuccessSnackbar: state.snackbar.showSuccessSnackbar,
    showErrorSnackbar: state.snackbar.showErrorSnackbar,
    message: state.snackbar.message,
    isAuthenticated: state.auth.isAuthenticated,
    showLoader: state.loader.showLoader
  };
}

export default withRouter(connect(mapStateToProps)(App));
