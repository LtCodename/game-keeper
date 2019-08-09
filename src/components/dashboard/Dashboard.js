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
          <p className="dashboardText">Very interesting introduction text that tells you all about this site and describes all its wonderfull features in a jolly manner.</p>
          {sorryOrStatistics}
        </div>
      </div>
    )
  }
}

export default Dashboard;
