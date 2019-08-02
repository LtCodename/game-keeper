import React from 'react';

class Block extends React.Component {

  render() {
    let className = 'game-block game-block_';

    if (this.props.color) {
      className += this.props.color;
    }

    return (
      <div className={className}>
        <p>{this.props.gameName}</p>
      </div>
    )
  }
}

export default Block;
