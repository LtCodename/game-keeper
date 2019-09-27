import React from 'react';
import './App.css';
import List from './components/list/List.js';
import Nav from './components/nav/Nav.js';
import Footer from './components/footer/Footer.js';
import Header from './components/header/Header.js';
import Dashboard from './components/dashboard/Dashboard.js';
import Profile from './components/profile/Profile.js';
import Developers from './components/developers/Developers.js';
import Suggested from './components/suggested/Suggested.js';
import Preloader from './components/preloader/Preloader.js';
import reducers from './redux/reducers';
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
declare var firebase;

class App extends React.Component {

  constructor(props) {
    super(props);

    this.fecthUser();
    this.fecthDevelopers();
    this.fecthSuggested();
    this.fecthPlatforms();

    this.state = {
      userDataLoaded: false,
      developersDataLoaded: false,
      suggestedDataLoaded: false,
      platformsDataLoaded: false,
      unauthorized: false,
    }
  }

  fecthUser() {
    firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        user.getIdTokenResult().then(idTokenResult => {
          user.admin = idTokenResult.claims.admin;
          this.props.checkUserPresence(user);
          this.setState({
            userDataLoaded: true
          });
        })
      }else {
        this.props.checkUserPresence(user);
        this.setState({
          unauthorized: true
        });
      }
    })
  }

  fecthDevelopers() {
    firebase.firestore().collection('developers').orderBy("name").onSnapshot(snapshot => {
      this.props.fecthDevelopers(snapshot);
      this.setState({
        developersDataLoaded: true
      });
    }, error => {
      console.log(error.message);
    });
  }

  fecthSuggested() {
    firebase.firestore().collection('suggestedDevelopers').orderBy("name").onSnapshot(snapshot => {
      this.props.fecthSuggestedDevelopers(snapshot);
      this.setState({
        suggestedDataLoaded: true
      });
    }, error => {
      console.log(error.message);
    });
  }

  fecthPlatforms() {
    firebase.firestore().collection('platforms').get().then(snapshot => {
      this.props.fecthPlatforms(snapshot);
      this.setState({
        platformsDataLoaded: true
      });
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

    const routes = (
      <div>
        <Route path="/profile" component={Profile} />
        <Route path="/developers" component={Developers} />
        <Route path="/suggested" component={Suggested} />
      </div>
    )

    const content = (
      <div className="appWrapper">
        <header>
          {header}
          {routes}
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

    const fake = (
      <div className="appWrapper">
        <Preloader/>
      </div>
    );
    
    return (
      <BrowserRouter>
        {((this.state.userDataLoaded && this.state.developersDataLoaded && this.state.suggestedDataLoaded && this.state.platformsDataLoaded) || this.state.unauthorized) ? content : fake}
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
    fecthSuggestedDevelopers: (snapshot) => {
      dispatch({ type: reducers.actions.suggestedActions.SUGGESTED_FETCH, snapshot: snapshot });
    },
    fecthPlatforms: (snapshot) => {
      dispatch({ type: reducers.actions.platformsActions.PLATFORMS_FETCH, snapshot: snapshot });
    }
  }
};

const AppConnected = connect(stateToProps, appDispatchToProps)(App);

export default AppConnected;
