import React from 'react';
import './Nav.css';
import AddListModalWindow from '../add-list-modal-window/AddListModalWindow.js';
declare var $;

class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.switchBetweenTabs = this.switchBetweenTabs.bind(this);
    this.openAddListWindow = this.openAddListWindow.bind(this);
    this.resetState = this.resetState.bind(this);

    this.state = {
      navbarVisible: false,
      showAddListWindow: false
    };
  }

  openAddListWindow() {
    this.setState({
      showAddListWindow: true
    }, () => {
      $("#addListNav").modal('show');
      $("#addListNav").on('hidden.bs.modal', this.resetState);
    });
  }

  resetState() {
    this.setState({
      showAddListWindow: false
    })
  }

  componentWillUnmount() {
    $("#addListNav").unbind('hidden.bs.modal');
  }

  switchBetweenTabs(index) {
    this.props.switchBetweenTabs(index);
    this.setState({
      navbarVisible: false
    });
  }

  toggleNavbar() {
    if (!this.state.navbarVisible) {
      this.setState({
        navbarVisible: true
      });
    }else {
      this.setState({
        navbarVisible: false
      });
    }
  }

  render() {
    let buttonsToRender = this.props.content.map((elem, index) => {

      let className = "navButton btn btn-light";

      if (this.props.indexToHighligth === index) {
        className += " navButtonActive";
      }

      return <button className={className} type="button" key={elem.id} onClick={() => this.switchBetweenTabs(index)}>{elem.name}</button>;
    })

    const addListButton = (
      <div>
        <button className="btn btn-warning btnAddList" onClick={this.openAddListWindow}>Add List</button>
      </div>
    );

    const hideButton = (
      <button className="btn hideNavButton" onClick={this.toggleNavbar}><i className="fas fa-chevron-down"></i></button>
    );

    let navClassName = "navBar";

    if (this.state.navbarVisible) {
        navClassName += " navBarVisible";
    }

    const modalAddListWindow = (
      <AddListModalWindow
        modalId={"addListNav"}
        onProceed={(listName) => this.props.doOnAdd(listName)}
        message={`Click here to pass a new list name`} />
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

export default Nav;
