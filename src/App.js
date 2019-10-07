import React from 'react';
import UserList from './components/user-list/UserList.js';
import Nav from './components/nav/Nav.js';
import Footer from './components/footer/Footer.js';
import Header from './components/header/Header.js';
import Dashboard from './components/dashboard/Dashboard.js';
import Profile from './components/profile/Profile.js';
import Developers from './components/developers/Developers.js';
import Suggested from './components/suggested/Suggested.js';
import Privacy from './components/privacy/Privacy.js';
import Preloader from './components/preloader/Preloader.js';
import reducers from './redux/reducers';
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
declare var firebase;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listsSectionsBlocksLoaded: false,
      userAuthDataLoaded: false,
      developersDataLoaded: false,
      suggestedDataLoaded: false,
      colorsDataLoaded: false,
      platformsDataLoaded: false,
      unauthorized: false,
    }
  }

  componentDidMount() {
    this.fetchEverything();
  }

  fetchEverything = () => {
    this.fecthUser();
    this.fecthDevelopers();
    this.fecthColors();
    this.fecthSuggested();
    this.fecthPlatforms();
  }

  fecthDevelopers() {
    firebase.firestore().collection('developers').orderBy("name").onSnapshot(snapshot => {
      this.props.fecthDevelopers(snapshot);
      setTimeout(() => {
        this.setState({
          developersDataLoaded: true
        });
      }, 0);
    }, error => {
      console.log(error.message);
    });
  }

  fecthColors() {
    firebase.firestore().collection('availableColors').onSnapshot(snapshot => {
      this.props.fecthColors(snapshot);
      setTimeout(() => {
        this.setState({
          colorsDataLoaded: true
        });
      }, 0);
    }, error => {
      console.log(error.message);
    });
  }

  fecthSuggested() {
    firebase.firestore().collection('suggestedDevelopers').orderBy("name").onSnapshot(snapshot => {
      this.props.fecthSuggestedDevelopers(snapshot);
      setTimeout(() => {
        this.setState({
          suggestedDataLoaded: true
        });
      }, 0);
    }, error => {
      console.log(error.message);
    });
  }

  fecthPlatforms() {
    firebase.firestore().collection('platforms').get().then(snapshot => {
      this.props.fecthPlatforms(snapshot);
      setTimeout(() => {
        this.setState({
          platformsDataLoaded: true
        });
      }, 0);
    }).catch(error => {
      console.log(error.message);
    });
  }

  fecthUser() {
    firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        user.getIdTokenResult().then(idTokenResult => {
          user.admin = idTokenResult.claims.admin;
          this.props.checkUserPresence(user);
          setTimeout(() => {
            this.setState({
              userAuthDataLoaded: true
            });
          }, 0);
        });
        this.fecthData(user.uid);
      }else {
        this.props.checkUserPresence(user);
        this.setState({
          unauthorized: true
        });
      }
    })
  }

  fecthData = (uid) => {
    firebase.firestore().collection('users').doc(uid).onSnapshot(
      doc => {
        if (doc.exists) {
           console.log("Document data:", doc.data());
           const allUserData = doc.data() || {};
           this.props.setListsToStore(allUserData.lists || []);
           this.props.setSectionsToStore(allUserData.sections || []);
           this.props.setBlocksToStore(allUserData.blocks || []);
       } else {
           console.log("No such document!");
       }
       setTimeout(() => {
         this.setState({
           listsSectionsBlocksLoaded: true
         });
       }, 0);
      }, error => {
        console.log(error.message);
      }
    );
  }

  render() {
    const dashboard = (
      <Route exact path="/" component={Dashboard} />
    );

    let listOrDashboard;

    if (this.props.selectedListIndex === null) {
      listOrDashboard = dashboard;
    }else {
      listOrDashboard = <UserList/>;
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
        <Route path="/privacy" component={Privacy} />
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
        {((this.state.listsSectionsBlocksLoaded
           && this.state.developersDataLoaded
           && this.state.suggestedDataLoaded
           && this.state.colorsDataLoaded
           && this.state.userAuthDataLoaded
           && this.state.platformsDataLoaded) || this.state.unauthorized) ? content : fake}
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
    fecthColors: (snapshot) => {
      dispatch({ type: reducers.actions.colorsActions.COLORS_FETCH, snapshot: snapshot });
    },
    fecthSuggestedDevelopers: (snapshot) => {
      dispatch({ type: reducers.actions.suggestedActions.SUGGESTED_FETCH, snapshot: snapshot });
    },
    fecthPlatforms: (snapshot) => {
      dispatch({ type: reducers.actions.platformsActions.PLATFORMS_FETCH, snapshot: snapshot });
    },
    setListsToStore: (lists) => {
      dispatch({ type: reducers.actions.userListsActions.LISTS_SET, lists: lists });
    },
    setSectionsToStore: (sections) => {
      dispatch({ type: reducers.actions.userSectionsActions.SECTIONS_SET, sections: sections });
    },
    setBlocksToStore: (blocks) => {
      dispatch({ type: reducers.actions.userBlocksActions.BLOCKS_SET, blocks: blocks });
    }
  }
};

const AppConnected = connect(stateToProps, appDispatchToProps)(App);

export default AppConnected;
