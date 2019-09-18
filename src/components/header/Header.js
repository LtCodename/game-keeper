import React from 'react';
import './Header.css';
import reducers from '../../redux/reducers';
import { connect } from 'react-redux'
import SignUpModalWindow from '../sign-up-modal-window/SignUpModalWindow.js';
import LogInModalWindow from '../log-in-modal-window/LogInModalWindow.js';
import ProfileModalWindow from '../profile-modal-window/ProfileModalWindow.js';
declare var $;

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.onSignUpClick = this.onSignUpClick.bind(this);
    this.onLogInClick = this.onLogInClick.bind(this);
    this.onProfileClick = this.onProfileClick.bind(this);
    this.resetState = this.resetState.bind(this);
    this.closeSignUpModal = this.closeSignUpModal.bind(this);

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

  closeSignUpModal() {
    $("#signUpWindow").modal('hide');
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

    const signButtons = (
      <div className="signWrapper">
        <button className="btn profileButton" onClick={this.onLogInClick}>Log In</button>
        <button className="btn profileButton" onClick={this.onSignUpClick}>Sign Up</button>
        <button className="btn profileButton" onClick={this.onProfileClick}>Profile</button>
      </div>
    );

    const signUpWindow = (
      <SignUpModalWindow close={this.closeSignUpModal} />
    );

    const logInWindow = (
      <LogInModalWindow />
    );

    const profileWindow = (
      <ProfileModalWindow />
    );

    return (
      <div className="headerWrappper">
        {logo}
        {signButtons}
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
    allLists: state.lists
  }
};

const HeaderConnected = connect(stateToProps, headerDispatchToProps)(Header);

export default HeaderConnected;
