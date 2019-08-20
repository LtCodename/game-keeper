import React from 'react';
import ListBlock from '../list-block/ListBlock.js';
import './Dashboard.css'
import AddListModalWindow from '../add-list-modal-window/AddListModalWindow.js';
declare var  $;

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
      <button className="btn btnAddListFromDashboard" onClick={this.openAddListWindow}><i className="fas fa-plus-circle"></i></button>
    );

    const modalAddListWindow = (
      <AddListModalWindow
        modalId={"addList"}
        onProceed={(listName) => this.props.doOnAdd(listName)}
        message={`Click here to pass a new list name`} />
    );

    return (
      <div className="dashboardWrapper">
        <div className="logoButtonDiv">
          <button className="logoButtonDashboard btn" onClick={this.goToDashboard}>Game Keeper</button>
        </div>
        <div className="dashboard">
          <h1 className="dashboardText">DASHBOARD</h1>
          <p className="dashboardText">Keep track of games you play in style!</p>
          <div className="dashboardImageContainer">
            <img src="https://media.giphy.com/media/l46Cy1rHbQ92uuLXa/giphy.gif" alt="Dashboard" height="360" width="480" className="dashboardImage"></img>
          </div>
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

export default Dashboard;
