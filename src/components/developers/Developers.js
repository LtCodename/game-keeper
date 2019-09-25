import React from 'react';
import './Developers.css';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';

class Developers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className="developersWrapper">
        <p>Developers</p>
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
