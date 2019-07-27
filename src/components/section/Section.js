import React from 'react';

class Section extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="section">
        <h2>{this.props.name}</h2>
        <div className="inner-section">
          <div className="game-block game-block_roster">
            <p>World Of Warcraft: Battle For Azeroth 8.2</p>
          </div>
          <div className="game-block game-block_roster">
            <p>F1 2019</p>
          </div>
          <div className="game-block game-block_roster">
            <p>Hearthstone</p>
          </div>
          <div className="game-block game-block_roster">
            <p>Rocket League</p>
          </div>
          <div className="game-block game-block_roster">
            <p>Heroes Of The Storm</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Section;
