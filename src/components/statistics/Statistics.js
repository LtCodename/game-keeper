import React from 'react';
import './Statistics.css';

class Statistics extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    let sectionsNumber = 0;
    let gamesNumber = 0;

    for (var section in this.props.data) {
      //console.log(this.props.data[section].content);
      sectionsNumber += this.props.data[section].content.length;

      for (var prop in this.props.data[section].content) {
        //console.log(this.props.data[section].content[prop].games);
        gamesNumber += this.props.data[section].content[prop].games.length;
      }
    }

    return (
      <div className="statistics">
        <p className="dashboardText">{`You have ${this.props.data.length} lists.`}</p>
        <p className="dashboardText">{`You have ${sectionsNumber} sections in your lists.`}</p>
        <p className="dashboardText">{`You have ${gamesNumber} games in your sections.`}</p>
      </div>
    )
  }
}

export default Statistics;
