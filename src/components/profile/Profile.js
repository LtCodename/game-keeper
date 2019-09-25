import React from 'react';
import './Profile.css';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    if (props.userData === null) {
      props.history.push('/');
    }
    this.state = {
    };
  }

  render() {
    let validEmail = "";
    if (this.props.userData !== null) {
      validEmail = this.props.userData.email
    }
    return (
      <div className="profileWrapper">
        <p>Logged as {validEmail}</p>
        <NavLink to="/developers"><button className="btn developersButton">Manage Developers</button></NavLink>
      </div>
    )
  }
}

const stateToProps = (state = {}) => {
  return {
    userData: state.userData
  }
};

const ProfileConnected = connect(stateToProps, null)(Profile);

export default ProfileConnected;
