import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Normas from './components/Normas';
import Consultorias from './components/Consultorias';
import Abnt from './components/Abnt';
import Dashboard from './components/Dashboard';
import LogIn from './components/auth/LogIn';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ForgotPasswordVerification from './components/auth/ForgotPasswordVerification';
import ChangePassword from './components/auth/ChangePassword';
import ChangePasswordConfirm from './components/auth/ChangePasswordConfirm';
import Welcome from './components/auth/Welcome';
import Footer from './components/Footer';
import { Auth } from 'aws-amplify';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
library.add(faEdit);

class App extends Component {

  _isMounted = false;

  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null,
    token: null
  }

  setAuthStatus = authenticated => {
    this.setState({isAuthenticated: authenticated});
  }

  setUser = user => {
    this.setState({ user: user });
  }

async componentDidMount() {
  try{
    this._isMounted = true;
    const session = await Auth.currentSession();
    this.setAuthStatus(true);
    console.log(session);
    const user = await Auth.currentAuthenticatedUser();
    this.setUser(user);
    const token = user.signInUserSession.idToken.jwtToken;
    console.log("token:" + token);  
    this.setToken(token);
  }catch(error) {
    console.log(error);
  }
  this.setState( { isAuthenticating: false });
}

componentWillUnmount() {
  this._isMounted = false;
}

  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    }

    const ProtectedRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.state.isAuthenticated === true
          ? <Component {...props} />
          : <Redirect to={{
              pathname: '/login',
              state: { from: props.location }
            }} />
      )} />
    );    

    return (
      !this.state.isAuthenticating &&
      <div className="App">
        <Router>
          <div>
            <Navbar auth={authProps} />
            <Switch>
              <Route exact path="/" render={(props) => <Home {...props} auth={authProps} /> } />
              <ProtectedRoute path="/normas" component={Normas} />
              <ProtectedRoute path="/consultorias" component={Consultorias} />
              <ProtectedRoute path="/abnt" component={Abnt} />
              <ProtectedRoute path="/dashboard" component={Dashboard} />
              <Route exact path="/login" render={(props) => <LogIn {...props} auth={authProps} /> } />
              <Route exact path="/register" render={(props) => <Register {...props} auth={authProps} /> } />
              <Route exact path="/forgotpassword" render={(props) => <ForgotPassword {...props} auth={authProps} /> } />
              <Route exact path="/forgotpasswordverification" render={(props) => <ForgotPasswordVerification {...props} auth={authProps} /> } />
              <ProtectedRoute path="/changepassword" component={ChangePassword} />
              <ProtectedRoute path="/changepasswordconfirmation" component={ChangePasswordConfirm} />
              <ProtectedRoute path="/welcome" component={Welcome} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
