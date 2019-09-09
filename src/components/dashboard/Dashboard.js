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
      $("#addList").modal('show');
      $("#addList").on('hidden.bs.modal', this.resetState);
    });
  }

  resetState() {
    this.setState({
      showAddListWindow: false
    })
  }

  componentWillUnmount() {
    $("#addList").unbind('hidden.bs.modal');
  }

  render() {
    const listsToRender = this.props.data.map((elem, index) => {
      return <ListBlock
        key={elem.id}
        listBlockClick={() => this.props.listBlockClick(index)}
        name={elem.name}/>;
    });

    const addListButton = (
      <button className="btn btnAddListFromDashboard" onClick={this.openAddListWindow}>ADD LIST</button>
    );

    const modalAddListWindow = (
      <AddListModalWindow
        modalId={"addList"}
        onProceed={(listName) => this.props.doOnAdd(listName)}
        message={`Click here to pass a new list name`} />
    );

    return (
      <div className="dashboardWrapper">
        <div className="dashboard">
          <div className="listsMatrix">
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

const DashboardConnected = connect(null, listDispatchToProps)(Dashboard);

export default DashboardConnected;
