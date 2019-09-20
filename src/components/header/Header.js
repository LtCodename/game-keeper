import React from 'react';
import './Header.css';
import reducers from '../../redux/reducers';
import { connect } from 'react-redux'
import SignUpModalWindow from '../sign-up-modal-window/SignUpModalWindow.js';
import LogInModalWindow from '../log-in-modal-window/LogInModalWindow.js';
import ProfileModalWindow from '../profile-modal-window/ProfileModalWindow.js';
declare var $;
declare var firebase;

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.onSignUpClick = this.onSignUpClick.bind(this);
    this.onLogInClick = this.onLogInClick.bind(this);
    this.onLogOutClick = this.onLogOutClick.bind(this);
    this.onProfileClick = this.onProfileClick.bind(this);
    this.resetState = this.resetState.bind(this);
    this.closeSignUpModal = this.closeSignUpModal.bind(this);
    this.closeLogInModal = this.closeLogInModal.bind(this);

    this.state = {
      showSignUpWindow: false,
      showLogInWindow: false,
      showProfileWindow: false
    };
  }

  onProfileClick() {
    this.setState({
      showProfileWindow: true
    }, () => {
      $("#profileWindow").modal('show');
      $("#profileWindow").on('hidden.bs.modal', this.resetState);
    });
  }

  onSignUpClick() {
    this.setState({
      showSignUpWindow: true
    }, () => {
      $("#signUpWindow").modal('show');
      $("#signUpWindow").on('hidden.bs.modal', this.resetState);
    });
  }

  onLogInClick() {
    this.setState({
      showLogInWindow: true
    }, () => {
      $("#logInWindow").modal('show');
      $("#logInWindow").on('hidden.bs.modal', this.resetState);
    });
  }

  onLogOutClick() {
    firebase.auth().signOut().then(() => {
    }).catch(error => {
      console.log(error.message);
    });
    this.props.changeListIndex(null, this.props.allLists.length);
  }

  closeSignUpModal() {
    $("#signUpWindow").modal('hide');
  }

  closeLogInModal() {
    $("#logInWindow").modal('hide');
  }

  resetState() {
    this.setState({
      showSignUpWindow: false,
      showProfileWindow: false,
      showLogInWindow: false
    })
  }

  componentWillUnmount() {
    $("#signUpWindow").unbind('hidden.bs.modal');
    $("#logInWindow").unbind('hidden.bs.modal');
    $("#profileWindow").unbind('hidden.bs.modal');
  }

  render() {
    const logo = (
      <div className="logoWrapper">
        <button className="btn" onClick={() => this.props.changeListIndex(null, this.props.allLists.length)}>Game Keeper</button>
      </div>
    );

    const logInButton = (
      <div className="authButtonWrapper">
        <button className="btn profileButton" onClick={this.onLogInClick}>Log In<img className="authIcon" alt="" src={process.env.PUBLIC_URL + '/icons/auth-login.svg'}></img></button>
        <button className="btn profileButtonAlt" onClick={this.onLogInClick}><img className="authIconAlt" alt="" src={process.env.PUBLIC_URL + '/icons/auth-login.svg'}></img></button>
      </div>
    );

    const logOutButton = (
      <div className="authButtonWrapper">
        <button className="btn profileButton" onClick={this.onLogOutClick}>Log Out<img className="authIcon" alt="" src={process.env.PUBLIC_URL + '/icons/auth-logout.svg'}></img></button>
        <button className="btn profileButtonAlt" onClick={this.onLogOutClick}><img className="authIconAlt" alt="" src={process.env.PUBLIC_URL + '/icons/auth-logout.svg'}></img></button>
      </div>
    );

    const signUpButton = (
      <div className="authButtonWrapper">
        <button className="btn profileButton" onClick={this.onSignUpClick}>Sign Up<img className="authIcon" alt="" src={process.env.PUBLIC_URL + '/icons/auth-signup.svg'}></img></button>
        <button className="btn profileButtonAlt" onClick={this.onSignUpClick}><img className="authIconAlt" alt="" src={process.env.PUBLIC_URL + '/icons/auth-signup.svg'}></img></button>
      </div>
    );

    const profileButton = (
      <div className="authButtonWrapper">
        <button className="btn profileButton" onClick={this.onProfileClick}>Profile<img className="authIcon" alt="" src={process.env.PUBLIC_URL + '/icons/auth-profile.svg'}></img></button>
        <button className="btn profileButtonAlt" onClick={this.onProfileClick}><img className="authIconAlt" alt="" src={process.env.PUBLIC_URL + '/icons/auth-profile.svg'}></img></button>
      </div>
    );

    const signUpWindow = (
      <SignUpModalWindow close={this.closeSignUpModal} />
    );

    const logInWindow = (
      <LogInModalWindow close={this.closeLogInModal}/>
    );

    const profileWindow = (
      <ProfileModalWindow />
    );

    return (
      <div className="headerWrappper">
        {logo}
        <div className="signWrapper">
          {!this.props.userData ? logInButton : ""}
          {!this.props.userData ? signUpButton : ""}
          {this.props.userData ? logOutButton : ""}
          {this.props.userData ? profileButton : ""}
        </div>
        {this.state.showSignUpWindow ? signUpWindow : ""}
        {this.state.showLogInWindow ? logInWindow : ""}
        {this.state.showProfileWindow ? profileWindow : ""}
      </div>
    )
  }
}

const headerDispatchToProps = (dispatch) => {
  return {
    changeListIndex: (index, listsLength) => {
      dispatch({ type: reducers.actions.selectedListIndexActions.SLI_CHANGE, index: index, listsLength: listsLength });
    }
  }
};

const stateToProps = (state = {}) => {
  return {
    allLists: state.lists,
    userData: state.userData
  }
};

const HeaderConnected = connect(stateToProps, headerDispatchToProps)(Header);

export default HeaderConnected;
