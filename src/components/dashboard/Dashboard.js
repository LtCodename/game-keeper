import React from 'react';
import ListBlock from '../list-block/ListBlock.js';
import SearchPanel from '../search-panel/SearchPanel.js';
import './Dashboard.css'
import AddListModalWindow from '../add-list-modal-window/AddListModalWindow.js';
import SignUpModalWindow from '../sign-up-modal-window/SignUpModalWindow.js';
import LogInModalWindow from '../log-in-modal-window/LogInModalWindow.js';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
declare var $;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        showAddListWindow: false,
        showSignUpWindow: false,
        showLogInWindow: false,
    };
  }

  onSignUpClick = () => {
    this.setState({
      showSignUpWindow: true
    }, () => {
      $("#signUpWindow").modal('show');
      $("#signUpWindow").on('hidden.bs.modal', this.resetState);
    });
  };

  onLogInClick = () => {
    this.setState({
      showLogInWindow: true
    }, () => {
      $("#logInWindow").modal('show');
      $("#logInWindow").on('hidden.bs.modal', this.resetState);
    });
  };

  onDemoClick = () => {

  };

  closeSignUpModal = () => {
    $("#signUpWindow").modal('hide');
  };

  closeLogInModal = () => {
    $("#logInWindow").modal('hide');
  };

  openAddListWindow = () => {
    this.setState({
      showAddListWindow: true
    }, () => {
      $("#addListWindow").modal('show');
      $("#addListWindow").on('hidden.bs.modal', this.resetState);
    });
  };

  resetState = () => {
    this.setState({
      showAddListWindow: false,
      showSignUpWindow: false,
      showLogInWindow: false
    })
  };

  componentWillUnmount() {
    $("#addListWindow").unbind('hidden.bs.modal');
    $("#signUpWindow").unbind('hidden.bs.modal');
    $("#logInWindow").unbind('hidden.bs.modal');
  }

  render() {
    const listsToRender = this.props.userLists.map((elem, index) => {
      const route = elem.name.replace(/\s+/g, '-').toLowerCase();
      //return <NavLink key={elem.id} to={"/list/" + route}><ListBlock key={elem.id} listBlockIndex={index}/></NavLink>;
      return <ListBlock key={elem.id} listBlockIndex={index}/>
    });

    let btnAddListClassName = "btn btnAddListFromDashboard";

    if (this.props.userLists.length === 0) {
      btnAddListClassName += " btnAddListFromDashboardSpecial";
    }

    const addListButton = (
      <button className={btnAddListClassName} onClick={this.openAddListWindow}>Add List</button>
    );

    const modalAddListWindow = (
      <AddListModalWindow/>
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
              className="btn authButton"
              onClick={this.onSignUpClick}>
            Sign Up
            <img
              className="authButtonIcon"
              alt="" src={process.env.PUBLIC_URL + '/icons/auth-signup-blue.svg'}/>
          </button>
          <button
              className="btn authButton"
              onClick={this.onLogInClick}>
            Log In
            <img
                className="authButtonIcon"
                alt="" src={process.env.PUBLIC_URL + '/icons/auth-login-blue.svg'}/>
          </button>
          <button
              className="btn authButton"
              onClick={this.onDemoClick}>
            Demo
            <img
                className="authButtonIcon"
                alt="" src={process.env.PUBLIC_URL + '/icons/demo.svg'}/>
          </button>
        </div>
      </div>
    );

    const signUpWindow = (
      <SignUpModalWindow close={this.closeSignUpModal} />
    );

    const logInWindow = (
      <LogInModalWindow close={this.closeLogInModal}/>
    );

    return (
      <div className="dashboardWrapper">
        <div className="dashboard">
          {this.props.userData ? authorized : authPanel}
        </div>

        {this.state.showAddListWindow ? modalAddListWindow : ""}
        {this.state.showLogInWindow ? logInWindow : ""}
        {this.state.showSignUpWindow ? signUpWindow : ""}
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
