import React from 'react';
import './Suggested.css';
import { connect } from 'react-redux'
import SuggestedDeveloper from "../suggested-developer/SuggestedDeveloper";

class Suggested extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const developersToRender = this.props.suggestedDevelopers.map((elem, index) => {
      return (
        <SuggestedDeveloper key={index} devData={elem}/>
      );
    });

    return (
      <div className="suggestedWrapper">
        <span className="developers-info">Press add or delete button to add or remove developer from Firestore. Items are sorted alphabetically.</span>
        <div className="blocksWrapper">
          {developersToRender}
        </div>
      </div>
    )
  }
}

const stateToProps = (state = {}) => {
  return {
    suggestedDevelopers: state.suggestedDevelopers
  }
};

const SuggestedConnected = connect(stateToProps, null)(Suggested);

export default SuggestedConnected;
