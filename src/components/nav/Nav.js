import React from 'react';
import './Nav.css';
import { connect } from 'react-redux'
import { NavArrowIcon } from "../../IconsLibrary";
import { NavLink } from 'react-router-dom';
import AddListTool from "../add-list-tool/AddListTool";

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navbarVisible: false,
      showAddListTool: false
    };
  }

  showAddListTool = () => {
    this.setState({
      showAddListTool: !this.state.showAddListTool
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
        <button
            className="nav-add-list-button"
            onClick={this.showAddListTool}>
          Add Collection
        </button>
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

    const addListNode = this.state.showAddListTool ? <AddListTool
        changeMode={this.showAddListTool}
        userLists={this.props.userLists}
        userData={this.props.userData}
    /> : addListButton;

    return (
      <nav className="navbarWrapper">
        <div className="hideButtonWrapper">
          {hideButton}
        </div>
        <div className={navClassName}>
          {buttonsToRender}
          {this.props.userData.email === 'fake@email.com' ? '' : addListNode}
        </div>
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
