import React from 'react';
import ListBlock from '../list-block/ListBlock.js';
import './Dashboard.css'

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const listsToRender = this.props.data.map((elem, index) => {
      return <ListBlock
        key={elem.id}
        listBlockClick={() => this.props.listBlockClick(index)}
        name={elem.name}/>;
    });

    const addListButton = (
      <button className="btn btnAddListFromDashboard" onClick={this.openAddGameWindow}><i className="fas fa-plus-circle"></i></button>
    );

    return (
      <div>
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
      </div>
    )
  }
}

export default Dashboard;
