import React from 'react';
import './Nav.css';
import AddListModalWindow from '../add-list-modal-window/AddListModalWindow.js';
import { connect } from 'react-redux'
import {NavArrowIcon} from "../../IconsLibrary";
import { NavLink } from 'react-router-dom';

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navbarVisible: false,
      showAddListWindow: false
    };
  }

  openAddListWindow = () => {
    this.setState({
      showAddListWindow: true
    });
  };

  closeAddListWindow = () => {
    this.setState({
      showAddListWindow: false
    });
  };

  toggleNavbar = () => {
    if (!this.state.navbarVisible) {
      this.setState({
        navbarVisible: true
      });
    }else {
      this.setState({
        navbarVisible: false
      });
    }
  };

  render() {
    let buttonsToRender = this.props.userLists.map((elem) => {
      return (
        <NavLink key={elem.id}
                 to={"/lists/" + elem.id}
                 className="navButton"
                 activeClassName="navButtonActive">
          {elem.name}
        </NavLink>
      )
    });

    const addListButton = (
      <div>
        <button className="btnAddList" onClick={this.openAddListWindow}>Add List</button>
      </div>
    );

    const hideButton = (
      <button className="hideNavButton" onClick={this.toggleNavbar}>
        {NavArrowIcon}
      </button>
    );

    let navClassName = "navBar";

    if (this.state.navbarVisible) {
        navClassName += " navBarVisible";
    }

    const modalAddListWindow = (
      <AddListModalWindow show={this.state.showAddListWindow} hideWindow={this.closeAddListWindow.bind(this)}/>
    );

    return (
      <nav className="navbarWrapper">
        <div className="hideButtonWrapper">
          {hideButton}
        </div>
        <div className={navClassName}>
          {buttonsToRender}
          {this.props.userData.email === 'fake@email.com' ? '' : addListButton}
        </div>
        {this.state.showAddListWindow ? modalAddListWindow : ""}
      </nav>
    )
  }
}

const stateToProps = (state = {}) => {
  return {
    userLists: state.userLists,
    userData: state.userData,
    listIndex: state.selectedListIndex
  }
};

const NavConnected = connect(stateToProps, null)(Nav);

export default NavConnected;
