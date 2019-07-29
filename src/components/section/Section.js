import React from 'react';
import Block from '../block/Block.js';

class Section extends React.Component {
  static defaultProps = {
    games: []
  }

  //constructor(props) {
    //super(props);
  //}

  render() {
    let gamesToRender = this.props.games.map(elem => {
      return <Block key={elem.id} color={this.props.color} gameName={elem.name}/>;
    })

    return (
      <div className="section">
        <h2>{this.props.sectionName}</h2>
        <div className="inner-section">
        {gamesToRender}
        </div>
      </div>
    )
  }
}

export default Section;
