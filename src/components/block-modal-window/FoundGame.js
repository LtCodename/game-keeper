import React from "react";
import "./BlockModalWindow.css";

class FoundGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onGameClick = () => {
    this.props.passIdBack(this.props.gameData.id);
  };

  render() {
    return (
      <button className="found-game-button" onClick={this.onGameClick}>
        {this.props.gameData.name}
      </button>
    );
  }
}

export default FoundGame;
