import React from 'react';
import Statistics from '../../components/statistics/Statistics.js';
import './Dashboard.css'

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    let sorryOrStatistics;

    if (!this.props.data.length) {
      sorryOrStatistics = <p>You don't have any lists.</p>;
    }else {
      sorryOrStatistics = <Statistics data={this.props.data} />
    }

    return (
      <div>
        <div className="dashboard">
          <h1 className="dashboardText">DASHBOARD</h1>
          <p className="dashboardText">Keep track of games you play in style!</p>
          <div className="dashboardImageContainer">
            <img src="https://media.giphy.com/media/l46Cy1rHbQ92uuLXa/giphy.gif" alt="Dashboard" height="360" width="480" className="dashboardImage"></img>
          </div>
          {/*sorryOrStatistics*/}
        </div>
      </div>
    )
  }
}

export default Dashboard;
