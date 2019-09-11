import React from 'react';
import ListBlock from '../list-block/ListBlock.js';
import './Dashboard.css'
import AddListModalWindow from '../add-list-modal-window/AddListModalWindow.js';
import reducers from '../../redux/reducers';
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
    const listsToRender = this.props.allLists.map((elem, index) => {
      return <ListBlock
        key={elem.id}
        name={elem.name}
        listBlockIndex={index}/>;
    });

    let btnAddListClassName = "btn btnAddListFromDashboard";

    if (this.props.allLists.length === 0) {
      btnAddListClassName += " btnAddListFromDashboardSpecial";
    }

    const addListButton = (
      <button className={btnAddListClassName} onClick={this.openAddListWindow}>ADD LIST</button>
    );

    const modalAddListWindow = (
      <AddListModalWindow/>
    );

    let matrixClassName = "listsMatrix";

    switch(this.props.allLists.length) {
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

    return (
      <div className="dashboardWrapper">
        <div className="dashboard">
          <div className={matrixClassName}>
            {listsToRender}
            {addListButton}
          </div>
        </div>

        {this.state.showAddListWindow ? modalAddListWindow : ""}
      </div>
    )
  }
}

const listDispatchToProps = (dispatch) => {
  return {
    doOnAdd: (listName) => {
      dispatch({ type: reducers.actions.listsActions.LIST_ADD, listName: listName});
    }
  }
};

const stateToProps = (state = {}) => {
  return {
    allLists: state.lists
  }
};

const DashboardConnected = connect(stateToProps, listDispatchToProps)(Dashboard);

export default DashboardConnected;
