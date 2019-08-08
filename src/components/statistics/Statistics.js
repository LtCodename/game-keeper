import React from 'react';

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
        <p>{`You have ${this.props.data.length} lists.`}</p>
        <p>{`You have ${sectionsNumber} sections in your lists.`}</p>
        <p>{`You have ${gamesNumber} games in your sections.`}</p>
      </div>
    )
  }
}

export default Statistics;
