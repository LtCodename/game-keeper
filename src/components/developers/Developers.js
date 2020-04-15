import React from 'react';
import './Developers.css';
import { connect } from 'react-redux'
import Developer from "../developer/Developer";

class Developers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    const developersToRender = this.props.developers.map((elem, index) => {
      return (
        <Developer key={index} devData={elem}/>
      );
    });

    return (
      <div className="developersWrapper">
        <span className="developers-info">Edit or delete developers from database. Items are sorted alphabetically.</span>
        <div className="blocksWrapper">
          {developersToRender}
        </div>
      </div>
    )
  }
}

const stateToProps = (state = {}) => {
  return {
    developers: state.developers
  }
};

const DevelopersConnected = connect(stateToProps, null)(Developers);

export default DevelopersConnected;
