import React from 'react';
import Statistics from '../../components/statistics/Statistics.js';

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
      <div className="dashboard">
        <h1>DASHBOARD</h1>
        <p>Very interesting introduction text that tells you all about this site and describes all its wonderfull features in a jolly manner.</p>
        {sorryOrStatistics}
      </div>
    )
  }
}

export default Dashboard;
