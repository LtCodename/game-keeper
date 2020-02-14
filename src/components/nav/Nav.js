import React from 'react';
import './Nav.css';
import AddListModalWindow from '../add-list-modal-window/AddListModalWindow.js';
import indexActions from '../../redux/reducers/selectedListIndexReducer';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
declare var $;

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
    }, () => {
      $("#addListWindow").modal('show');
      $("#addListWindow").on('hidden.bs.modal', this.resetState);
    });
  };

  resetState = () => {
    this.setState({
      showAddListWindow: false
    })
  };

  componentWillUnmount() {
    $("#addListWindow").unbind('hidden.bs.modal');
  }

  switchBetweenTabs = (index) => {
    this.props.changeListIndex(index, this.props.userLists.length);
    this.setState({
      navbarVisible: false
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
    let buttonsToRender = this.props.userLists.map((elem, index) => {

      let className = "navButton";

      if (this.props.listIndex === index) {
        className += " navButtonActive";
      }

      const route = elem.name.replace(/\s+/g, '-').toLowerCase();
      //return <NavLink key={elem.id} to={"/list/" + route}><button className={className} type="button" key={elem.id} onClick={() => this.switchBetweenTabs(index)}>{elem.name}</button></NavLink>;
      return <button className={className} type="button" key={elem.id} onClick={() => this.switchBetweenTabs(index)}>{elem.name}</button>;
    });

    const addListButton = (
      <div>
        <button className="btn btn-warning btnAddList" onClick={this.openAddListWindow}>Add List</button>
      </div>
    );

    const hideButton = (
      <button className="btn hideNavButton" onClick={this.toggleNavbar}><img className="hideArrow" alt="" src={process.env.PUBLIC_URL + '/icons/navbar-arrow.svg'}/></button>
    );

    let navClassName = "navBar";

    if (this.state.navbarVisible) {
        navClassName += " navBarVisible";
    }

    const modalAddListWindow = (
      <AddListModalWindow/>
    );

    return (
      <nav className="navbarWrapper">
        <div className="hideButtonWrapper">
          {hideButton}
        </div>
        <div className={navClassName}>
          {buttonsToRender}
          {addListButton}
        </div>
        {this.state.showAddListWindow ? modalAddListWindow : ""}
      </nav>
    )
  }
}

const listDispatchToProps = (dispatch) => {
  return {
    changeListIndex: (index, listsLength) => {
      dispatch({ type: indexActions.actions.SLI_CHANGE, index: index, listsLength: listsLength });
    }
  }
};

const stateToProps = (state = {}) => {
  return {
    userLists: state.userLists,
    listIndex: state.selectedListIndex
  }
};

const NavConnected = connect(stateToProps, listDispatchToProps)(Nav);

export default NavConnected;
