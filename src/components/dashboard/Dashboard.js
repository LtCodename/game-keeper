import React from 'react';
import ListBlock from '../list-block/ListBlock.js';
import './Dashboard.css'
import AddListModalWindow from '../add-list-modal-window/AddListModalWindow.js';
import { connect } from 'react-redux'
declare var $;

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.openAddListWindow = this.openAddListWindow.bind(this);
    this.resetState = this.resetState.bind(this);

    this.state = {
        showAddListWindow: false
    };
  }

  openAddListWindow() {
    this.setState({
      showAddListWindow: true
    }, () => {
      $("#addListWindow").modal('show');
      $("#addListWindow").on('hidden.bs.modal', this.resetState);
    });
  }

  resetState() {
    this.setState({
      showAddListWindow: false
    })
  }

  componentWillUnmount() {
    $("#addListWindow").unbind('hidden.bs.modal');
  }

  render() {
    const listsToRender = this.props.userLists.map((elem, index) => {
      return <ListBlock
        key={elem.id}
        listBlockIndex={index}/>;
    });

    let btnAddListClassName = "btn btnAddListFromDashboard";

    if (this.props.userLists.length === 0) {
      btnAddListClassName += " btnAddListFromDashboardSpecial";
    }

    const addListButton = (
      <button className={btnAddListClassName} onClick={this.openAddListWindow}>ADD LIST</button>
    );

    const modalAddListWindow = (
      <AddListModalWindow/>
    );

    let matrixClassName = "listsMatrix";

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

    const forRegisteredUsers = (
      <div className={matrixClassName}>
        {listsToRender}
        {addListButton}
      </div>
    );

    const forNotRegisteredUsers = (
      <div>
        <p className="signInMessage">Please sign up or log in</p>
      </div>
    );

    return (
      <div className="dashboardWrapper">
        <div className="dashboard">
          {this.props.userData ? forRegisteredUsers : forNotRegisteredUsers}
        </div>

        {this.state.showAddListWindow ? modalAddListWindow : ""}
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
