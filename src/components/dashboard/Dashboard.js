import React from 'react';
import ListBlock from '../list-block/ListBlock.js';
import SearchPanel from '../search-panel/SearchPanel.js';
import './Dashboard.css'
import AddListModalWindow from '../add-list-modal-window/AddListModalWindow.js';
import SignUpModalWindow from '../sign-up-modal-window/SignUpModalWindow.js';
import LogInModalWindow from '../log-in-modal-window/LogInModalWindow.js';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import fire from "../../Firebase";
import {DemoIcon, LogInIcon, SignUpIcon} from "../../IconsLibrary";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        showAddListWindow: false,
        showSignUpWindow: false,
        showLogInWindow: false,
    };
  }

  onLogInClick = () => {
    this.setState({
      showLogInWindow: true
    })
  };

  onSignUpClick = () => {
    this.setState({
      showSignUpWindow: true
    });
  };

  onDemoClick = (event) => {
    event.preventDefault();
    fire.auth().signInWithEmailAndPassword('fake@email.com', '123456780').then(credential => {
      console.log(credential);
    }).catch(error => {
      console.log(error.message);
    });
  };

  closeSignUpModal = () => {
    this.setState({
      showSignUpWindow: false
    });
  };

  closeLogInModal = () => {
    this.setState({
      showLogInWindow: false
    });
  };

  openAddListWindow = () => {
    this.setState({
      showAddListWindow: true
    });
  };

  hideAddListWindow = () => {
    this.setState({
      showAddListWindow: false
    });
  };

  render() {
    const listsToRender = this.props.userLists.map((elem, index) => {
      return <NavLink key={elem.id} to={"/lists/" + elem.id}><ListBlock listBlockIndex={index}/></NavLink>;
    });

    const addListButton = (
      <button className='btnAddListFromDashboard' onClick={this.openAddListWindow}>New Collection</button>
    );

    const modalAddListWindow = (
      <AddListModalWindow show={this.state.showAddListWindow} hideWindow={this.hideAddListWindow.bind(this)}/>
    );

    const authorized = (
      <div className='lists-dashboard-wrapper lt-row'>
        {listsToRender}
        {addListButton}
      </div>
    );

    const authPanel = (
      <div>
        <div className="authButtonsMatrix">
          <button
              className="authButton"
              onClick={this.onSignUpClick}>
            Sign Up
            <span className="auth-button-icon-wrapper">{SignUpIcon}</span>
          </button>
          <button
              className="authButton"
              onClick={this.onLogInClick}>
            Log In
            <span className="auth-button-icon-wrapper">{LogInIcon}</span>
          </button>
          <button
              className="authButton"
              onClick={this.onDemoClick}>
            Demo
            <span className="auth-button-icon-wrapper">{DemoIcon}</span>
          </button>
        </div>
      </div>
    );

    const signUpWindow = (
      <SignUpModalWindow show={this.state.showSignUpWindow} hideWindow={this.closeSignUpModal.bind(this)} />
    );

    const logInWindow = (
      <LogInModalWindow show={this.state.showLogInWindow} hideWindow={this.closeLogInModal.bind(this)}/>
    );

    return (
        <div className="contentWrapper">
          <div className="dashboardWrapper">
            <div className="dashboard">
              {this.props.userData ? authorized : authPanel}
            </div>
            {modalAddListWindow}
            {logInWindow}
            {signUpWindow}
          </div>
        </div>
    )
  }
}

const stateToProps = (state = {}) => {
  return {
    userLists: state.userLists,
    userData: state.userData
  }
};

const DashboardConnected = connect(stateToProps, null)(Dashboard);

export default DashboardConnected;
