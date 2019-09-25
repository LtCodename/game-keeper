import React from 'react';
import './App.css';
import List from './components/list/List.js';
import Nav from './components/nav/Nav.js';
import Footer from './components/footer/Footer.js';
import Header from './components/header/Header.js';
import Dashboard from './components/dashboard/Dashboard.js';
import Profile from './components/profile/Profile.js';
import Developers from './components/developers/Developers.js';
import reducers from './redux/reducers';
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
declare var firebase;

class App extends React.Component {

  constructor(props) {
    super(props);

    this.fecthUser();
    this.fecthDevelopers();
    this.fecthPlatforms();
  }

  fecthUser() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.checkUserPresence(user);
    })
  }

  fecthDevelopers() {
    firebase.firestore().collection('developers').orderBy("name").onSnapshot(snapshot => {
      this.props.fecthDevelopers(snapshot);
    }, error => {
      console.log(error.message);
    });
  }

  fecthPlatforms() {
    firebase.firestore().collection('platforms').get().then(snapshot => {
      this.props.fecthPlatforms(snapshot);
    }).catch(error => {
      console.log(error.message);
    });
  }

  render() {
    const dashboard = (
      <Route exact path="/" component={Dashboard} />
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
      <BrowserRouter>
        <div className="appWrapper">
          <header>
            {header}
            <Route path="/profile" component={Profile} />
            <Route path="/developers" component={Developers} />
          </header>
          <div className="contentWrapper">
              {(this.props.selectedListIndex === null) ? "" : nav}
              {listOrDashboard}
          </div>
          <footer>
            {footer}
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}

const stateToProps = (state = {}) => {
  return {
    selectedListIndex: state.selectedListIndex
  }
};

const appDispatchToProps = (dispatch) => {
  return {
    checkUserPresence: (user) => {
      dispatch({ type: reducers.actions.userActions.USER_CHECK, user: user });
    },
    fecthDevelopers: (snapshot) => {
      dispatch({ type: reducers.actions.developersActions.DEVELOPERS_FETCH, snapshot: snapshot });
    },
    fecthPlatforms: (snapshot) => {
      dispatch({ type: reducers.actions.platformsActions.PLATFORMS_FETCH, snapshot: snapshot });
    }
  }
};

const AppConnected = connect(stateToProps, appDispatchToProps)(App);

export default AppConnected;
