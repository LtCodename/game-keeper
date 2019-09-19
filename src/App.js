import React from 'react';
import './App.css';
import List from './components/list/List.js';
import Nav from './components/nav/Nav.js';
import Footer from './components/footer/Footer.js';
import Header from './components/header/Header.js';
import Dashboard from './components/dashboard/Dashboard.js';
import reducers from './redux/reducers';
import { connect } from 'react-redux'
declare var firebase;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.fecthUser();
  }

  fecthUser() {
    firebase.auth().onAuthStateChanged(user => {
      // if (user) {
      //   console.log('App: ' + JSON.stringify(user))
      //   console.log("App: user logged in");
      // }else {
      //   console.log('App: ' + user)
      //   console.log("App: user logged out");
      // }
      this.props.checkUserPresence(user);
    })
  }

  render() {
    const dashboard = (
      <Dashboard/>
    );

    let listOrDashboard;

    if (this.props.selectedListIndex === null) {
      listOrDashboard = dashboard;
    }else {
      listOrDashboard = <List/>
    }

    const nav = (
      <Nav/>
    );

    const footer = (
      <Footer/>
    );

    const header = (
      <Header/>
    );

    return (
      <div className="appWrapper">
        <header>
          {header}
        </header>
        <div className="contentWrapper">
            {(this.props.selectedListIndex === null) ? "" : nav}
            {listOrDashboard}
        </div>
        <footer>
          {footer}
        </footer>
      </div>
    );
  }
}

const stateToProps = (state = {}) => {
  return {
    lists: state.lists,
    developers: state.developers,
    selectedListIndex: state.selectedListIndex,
    userData: state.userData
  }
};

const appDispatchToProps = (dispatch) => {
  return {
    checkUserPresence: (user) => {
      dispatch({ type: reducers.actions.userActions.USER_CHECK, user: user });
    }
  }
};

const AppConnected = connect(stateToProps, appDispatchToProps)(App);

export default AppConnected;
