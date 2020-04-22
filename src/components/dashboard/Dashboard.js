import React from 'react';
import ListBlock from '../list-block/ListBlock.js';
import SearchPanel from '../search-panel/SearchPanel.js';
import './Dashboard.css'
import AddListModalWindow from '../add-list-modal-window/AddListModalWindow.js';
import SignUpModalWindow from '../sign-up-modal-window/SignUpModalWindow.js';
import LogInModalWindow from '../log-in-modal-window/LogInModalWindow.js';
/*import { NavLink } from 'react-router-dom';*/
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
    fire.auth().signInWithEmailAndPassword('fake@email.com', '1234567890').then(credential => {
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
      /*const route = elem.name.replace(/\s+/g, '-').toLowerCase();*/
      //return <NavLink key={elem.id} to={"/list/" + route}><ListBlock key={elem.id} listBlockIndex={index}/></NavLink>;
      return <ListBlock key={elem.id} listBlockIndex={index}/>
    });

    let btnAddListClassName = "btnAddListFromDashboard";

    if (this.props.userLists.length === 0) {
      btnAddListClassName += " btnAddListFromDashboardSpecial";
    }

    const addListButton = (
      <button className={btnAddListClassName} onClick={this.openAddListWindow}>Add List</button>
    );

    const modalAddListWindow = (
      <AddListModalWindow show={this.state.showAddListWindow} hideWindow={this.hideAddListWindow.bind(this)}/>
    );

    let matrixClassName = "listsMatrix listsMatrixPanel";

    switch(this.props.userLists.length) {
      case 2:
        matrixClassName += " threeCells";
        break;
      case 1:
        matrixClassName += " twoCells";
        break;
      case 0:
        matrixClassName += " oneCell";
        break;
      default:
        matrixClassName += " fourCells"
    }

    const authorized = (
      <div>
        <SearchPanel />
        <div className={matrixClassName}>
          {listsToRender}
          {addListButton}
        </div>
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
      <div className="dashboardWrapper">
        <div className="dashboard">
          {this.props.userData ? authorized : authPanel}
        </div>
        {modalAddListWindow}
        {logInWindow}
        {signUpWindow}
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
